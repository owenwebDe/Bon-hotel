'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  // Tour Stage Image Layers
  const imgOutsideRef = useRef(null);    // 1. Outside Estate & Pool
  const imgDoorRef = useRef(null);       // 2. Main Entrance & Glass Doors
  const imgReceptionRef = useRef(null);  // 3. Grand Reception & Marble Lobby
  const imgSuiteRef = useRef(null);      // 4. Executive Loft Bed & Panoramic Balcony
  const imgDuskRef = useRef(null);       // 5. Maitama Dusk Skyline (Footer)

  const progressBarRef = useRef(null);
  const hudStepRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  useEffect(() => {
    // 1. Lenis Smooth Momentum Scroll Engine
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.registerPlugin(ScrollTrigger);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. MASTER 5-STAGE CINEMATIC WALKTHROUGH FLIGHT (Whole Page Scrub)
    // Walkthrough steps:
    // Stage 1 (0% - 20%): Outside Estate -> Dolly camera toward travertine entrance
    // Stage 2 (20% - 42%): Cross through the Entrance Doors into the building
    // Stage 3 (42% - 65%): Glide into the Marble Reception & Concierge Lobby
    // Stage 4 (65% - 85%): Ascend to the Executive Loft & Bed overlooking Maitama
    // Stage 5 (85% - 100%): Sunset Panorama over Abuja
    const tourTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${(self.progress * 100).toFixed(1)}%`;
          }
        },
      },
    });

    const o = imgOutsideRef.current;
    const d = imgDoorRef.current;
    const r = imgReceptionRef.current;
    const s = imgSuiteRef.current;
    const dk = imgDuskRef.current;

    if (o && d && r && s && dk) {
      // Initialize starting transformations
      gsap.set(o, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, transformOrigin: '78% 60%' });
      gsap.set(d, { opacity: 0, scale: 0.85, xPercent: 0, yPercent: 0, transformOrigin: '50% 55%' });
      gsap.set(r, { opacity: 0, scale: 0.88, xPercent: 0, yPercent: 0, transformOrigin: '70% 60%' });
      gsap.set(s, { opacity: 0, scale: 0.90, xPercent: 0, yPercent: 0, transformOrigin: '40% 55%' });
      gsap.set(dk, { opacity: 0, scale: 1.08, xPercent: 0, yPercent: 0, transformOrigin: '50% 50%' });

      tourTl
        // =====================================================================
        // STAGE 1: WALKING TOWARDS THE ENTRANCE PORTAL (0% -> 26%)
        // Camera starts outside over the pool and dollies forward directly into the hotel doors
        // =====================================================================
        .to(o, {
          scale: 1.95,
          xPercent: -22,
          yPercent: -12,
          ease: 'power1.inOut',
          duration: 0.28,
        }, 0)
        // Doorway appears ahead in the camera perspective, growing larger as we approach
        .fromTo(d,
          { opacity: 0, scale: 0.78, yPercent: 8 },
          { opacity: 1, scale: 1.0, yPercent: 0, ease: 'power1.out', duration: 0.16 },
          0.12
        )
        // Outside image completely dissolves as we pass through the outer facade
        .to(o, {
          opacity: 0,
          ease: 'power1.in',
          duration: 0.08,
        }, 0.20)

        // =====================================================================
        // STAGE 2: PASSING DIRECTLY THROUGH THE AUTOMATED GLASS DOORS (26% -> 50%)
        // Camera glides right up to the sliding glass, pushes through, entering the reception lobby
        // =====================================================================
        .to(d, {
          scale: 2.2,
          yPercent: -8,
          ease: 'power2.in',
          duration: 0.24,
        }, 0.26)
        // Reception lobby emerges through the transparent center of the opening doors
        .fromTo(r,
          { opacity: 0, scale: 0.82, xPercent: 5 },
          { opacity: 1, scale: 1.0, xPercent: 0, ease: 'power1.out', duration: 0.16 },
          0.38
        )
        // Door frame flies past camera edges as we enter
        .to(d, {
          opacity: 0,
          ease: 'power2.in',
          duration: 0.10,
        }, 0.42)

        // =====================================================================
        // STAGE 3: GLIDING INTO THE GRAND RECEPTION & CONCIERGE (50% -> 74%)
        // Camera glides forward past the marble desk toward the private guest lift corridors
        // =====================================================================
        .to(r, {
          scale: 1.85,
          xPercent: -15,
          yPercent: -6,
          ease: 'power1.inOut',
          duration: 0.24,
        }, 0.50)
        // Private Executive Suite interior expands smoothly into view
        .fromTo(s,
          { opacity: 0, scale: 0.86, yPercent: 6 },
          { opacity: 1, scale: 1.0, yPercent: 0, ease: 'power1.out', duration: 0.16 },
          0.62
        )
        .to(r, {
          opacity: 0,
          ease: 'power1.in',
          duration: 0.10,
        }, 0.66)

        // =====================================================================
        // STAGE 4: ARRIVAL IN EXECUTIVE BEDROOM & BALCONY (74% -> 90%)
        // Camera moves smoothly into the suite, passing the plush bed toward the glass balcony
        // =====================================================================
        .to(s, {
          scale: 1.65,
          xPercent: 12,
          yPercent: -8,
          ease: 'power1.inOut',
          duration: 0.20,
        }, 0.74)
        // Dusk aerial view fades in for grand finale
        .fromTo(dk,
          { opacity: 0, scale: 1.25 },
          { opacity: 1, scale: 1.0, ease: 'power1.out', duration: 0.16 },
          0.84
        )
        .to(s, {
          opacity: 0,
          ease: 'power1.in',
          duration: 0.10,
        }, 0.86)

        // =====================================================================
        // STAGE 5: SUNSET PANORAMA OVER MAITAMA (90% -> 100%)
        // =====================================================================
        .to(dk, {
          scale: 1.0,
          xPercent: 0,
          yPercent: 0,
          ease: 'none',
          duration: 0.10,
        }, 0.90);
    }

    // 3. Hero Section Cards Crossfade (Synchronized tightly with 130vh tour track)
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.camera-tour-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });

    heroTl
      .to('#tour-card-1', {
        opacity: 0,
        y: -25,
        ease: 'power1.in',
      }, 0.20)
      .fromTo('#tour-card-2',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, ease: 'power1.out' },
        0.24
      )
      .to('#tour-card-2', {
        opacity: 0,
        y: -25,
        ease: 'power1.in',
      }, 0.52)
      .fromTo('#tour-card-3',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, ease: 'power1.out' },
        0.56
      )
      // Tour card 3 glides smoothly up as the amenities section immediately meets it
      .to('#tour-card-3', {
        opacity: 0,
        y: -40,
        ease: 'power1.in',
      }, 0.88);

    // 4. Horizontal Pinned Suite Track (Smooth scrubbing sideways across cards)
    if (horizontalTrackRef.current) {
      const getScrollAmount = () => {
        const trackWidth = horizontalTrackRef.current.scrollWidth;
        return -(trackWidth - window.innerWidth + window.innerWidth * 0.12);
      };

      gsap.to(horizontalTrackRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-scroll-container',
          start: 'top top',
          end: () => `+=${horizontalTrackRef.current.scrollWidth - window.innerWidth + 300}`,
          pin: '.horizontal-sticky-wrapper',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // 5. Bento Amenities Stagger (Keep cards fully visible, gentle entrance translate only)
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: '.amenities-bento',
        start: 'top 85%',
      },
      y: 30,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main>
      {/* 5-STAGE CONTINUOUS CINEMATIC CAMERA STAGE */}
      <div className="global-camera-viewport">
        {/* Layer 1: Outside Grounds & Pool */}
        <img
          ref={imgOutsideRef}
          src="/images/daylight.jpg"
          alt="BON Hotel Maitama Exterior and Grounds"
          className="global-camera-img"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 1 }}
        />
        {/* Layer 2: Main Entrance & Glass Doors */}
        <img
          ref={imgDoorRef}
          src="/images/entrance.jpg"
          alt="BON Hotel Grand Entrance Portal"
          className="global-camera-img"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        />
        {/* Layer 3: Grand Reception & Marble Lobby */}
        <img
          ref={imgReceptionRef}
          src="/images/reception.jpg"
          alt="BON Hotel Maitama Concierge Reception"
          className="global-camera-img"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        />
        {/* Layer 4: Executive Loft Suite & King Bed */}
        <img
          ref={imgSuiteRef}
          src="/images/suite.jpg"
          alt="BON Hotel Executive Loft Suite and Bed"
          className="global-camera-img"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        />
        {/* Layer 5: Maitama Twilight Sunset Skyline */}
        <img
          ref={imgDuskRef}
          src="/images/aerial.jpg"
          alt="BON Hotel Maitama Dusk Panorama"
          className="global-camera-img"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        />
      </div>
      <div className="global-camera-scrim"></div>

      {/* Warm Minimalist Navigation */}
      <header className="warm-nav">
        <a href="#top" className="nav-brand-title">BON Hotel Maitama</a>
        <nav className="nav-menu-links">
          <a href="#residences" className="nav-link">Residences</a>
          <a href="#amenities" className="nav-link">Amenities</a>
          <a href="#dining" className="nav-link">Gastronomy</a>
        </nav>
        <a href="https://wa.me/2347086300440" target="_blank" rel="noopener noreferrer" className="nav-action-pill">
          Direct Concierge
        </a>
      </header>

      {/* CHAPTER 1: HERO PINNED TOUR TRACK */}
      <section className="camera-tour-track" id="top">
        <div className="camera-sticky-viewport">
          {/* Card 1 */}
          <div className="tour-step-overlay">
            <div className="tour-card" id="tour-card-1">
              <span className="tour-tag">3 Negro Crescent · Maitama</span>
              <h1 className="tour-title">A Tranquil Sanctuary in <i>Abuja</i></h1>
              <p className="tour-desc">
                Welcome to BON Hotel Maitama. A discrete boutique haven in Abuja’s prime diplomatic quarter, enveloped by sunlit travertine terraces and lush palms.
              </p>
              <div className="tour-meta-row">
                <div className="tour-meta-item">
                  <strong>120</strong>
                  <span>Appointed Rooms</span>
                </div>
                <div className="tour-meta-item">
                  <strong>14:00</strong>
                  <span>Check-In</span>
                </div>
                <div className="tour-meta-item">
                  <strong>12:00</strong>
                  <span>Check-Out</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="tour-step-overlay">
            <div className="tour-card" id="tour-card-2">
              <span className="tour-tag">Arrival Experience</span>
              <h2 className="tour-title">Through the <i>Glass Portal</i></h2>
              <p className="tour-desc">
                Polished limestone steps lead seamlessly into Abuja’s quietest hospitality address, greeted with personal concierge care and complete discretion.
              </p>
              <div className="tour-meta-row">
                <div className="tour-meta-item">
                  <strong>24/7</strong>
                  <span>Private Chauffeur</span>
                </div>
                <div className="tour-meta-item">
                  <strong>Secure</strong>
                  <span>Diplomatic Zone</span>
                </div>
                <div className="tour-meta-item">
                  <strong>Valet</strong>
                  <span>Porte-Cochère</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="tour-step-overlay">
            <div className="tour-card" id="tour-card-3">
              <span className="tour-tag">Grand Reception</span>
              <h2 className="tour-title">The Grand <i>Concierge</i></h2>
              <p className="tour-desc">
                Towering floor-to-ceiling glass reveals the garden pool while bespoke Italian marble check-in services cater to distinguished international travelers.
              </p>
              <div className="tour-meta-row">
                <div className="tour-meta-item">
                  <strong>Instant</strong>
                  <span>VIP Check-In</span>
                </div>
                <div className="tour-meta-item">
                  <strong>Regent</strong>
                  <span>Hills Dining</span>
                </div>
                <div className="tour-meta-item">
                  <strong>Lounge</strong>
                  <span>Espresso & Cocktails</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: EDITORIAL BENTO AMENITIES (Inside Lobby & Facilities) */}
      <section className="editorial-section" id="amenities">
        <div className="section-editorial-header">
          <div>
            <span className="kicker">Standard of Excellence</span>
            <h2 className="main-headline">Curated for Discretion, Comfort, and Deep Restoration</h2>
          </div>
          <p className="sub-note">
            Every amenity is engineered to provide an uninterrupted stay in the Federal Capital Territory.
          </p>
        </div>

        <div className="amenities-bento">
          <div className="bento-card">
            <span className="bento-index">01</span>
            <h3 className="bento-title">120 Appointed Residences</h3>
            <p className="bento-text">
              Double-glazed acoustic windows, custom Italian bedding, ergonomic work desks, and private balconies overlooking Maitama.
            </p>
          </div>

          <div className="bento-card">
            <span className="bento-index">02</span>
            <h3 className="bento-title">Regent Hills Cuisine</h3>
            <p className="bento-text">
              Artisanal culinary dining bridging Nigerian regional delicacies with international continental gastronomic classics.
            </p>
          </div>

          <div className="bento-card">
            <span className="bento-index">03</span>
            <h3 className="bento-title">Executive Conference Center</h3>
            <p className="bento-text">
              High-definition hybrid conferencing, soundproofed private boardrooms, and seating for up to 120 distinguished guests.
            </p>
          </div>

          <div className="bento-card">
            <span className="bento-index">04</span>
            <h3 className="bento-title">Private Airport Transfers</h3>
            <p className="bento-text">
              Direct chauffeured transit connecting Nnamdi Azikiwe International Airport terminal seamlessly to your hotel door.
            </p>
          </div>

          <div className="bento-card">
            <span className="bento-index">05</span>
            <h3 className="bento-title">Outdoor Pool & Deck</h3>
            <p className="bento-text">
              Lush poolside loungers, ambient evening illumination, and 24-hour dedicated poolside service.
            </p>
          </div>

          <div className="bento-card">
            <span className="bento-index">06</span>
            <h3 className="bento-title">24-Hour Fitness Center</h3>
            <p className="bento-text">
              High-performance cardiovascular machines, free-weight stations, and climate-controlled exercise suites.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: HORIZONTAL PINNED SUITE SHOWCASE (Bedrooms, Dining & Boardrooms) */}
      <section className="horizontal-scroll-container" id="residences">
        <div className="horizontal-sticky-wrapper">
          <div className="horizontal-track" ref={horizontalTrackRef}>
            {/* Introductory Pin Card */}
            <div className="horizontal-intro-card">
              <span className="kicker">Accommodations</span>
              <h2 className="main-headline">Private Quarters & Dining</h2>
              <p className="sub-note">
                Scroll to explore our suites, culinary rooms, and meeting facilities designed for complete privacy.
              </p>
            </div>

            {/* Slide 1: Executive Loft */}
            <article className="suite-card-slide">
              <div className="slide-media">
                <img src="/images/suite.jpg" alt="Executive Loft Suite Interior" />
              </div>
              <div className="slide-content">
                <div>
                  <span className="slide-tag">Private Quarters</span>
                  <h3 className="slide-title">The Executive Loft</h3>
                  <p className="slide-desc">
                    Architectural two-level suites featuring double-height glass framing sunset views across the Maitama hills. Includes marble bath and mezzanine master bedroom.
                  </p>
                  <ul className="slide-features">
                    <li>Mezzanine floor with king orthopaedic bed</li>
                    <li>Deep whirlpool soaking tub with organic toiletries</li>
                    <li>Private sitting lounge with espresso machine</li>
                  </ul>
                </div>
                <a href="https://wa.me/2347086300440?text=I%20wish%20to%20reserve%20an%20Executive%20Loft" target="_blank" rel="noopener noreferrer" className="slide-cta">
                  Inquire Availability
                </a>
              </div>
            </article>

            {/* Slide 2: Regent Hills Dining */}
            <article className="suite-card-slide" id="dining">
              <div className="slide-media">
                <img src="/images/dining.jpg" alt="Regent Hills Restaurant and Bar" />
              </div>
              <div className="slide-content">
                <div>
                  <span className="slide-tag">Gastronomy</span>
                  <h3 className="slide-title">Regent Hills Dining</h3>
                  <p className="slide-desc">
                    An intimate culinary atmosphere offering chef-prepared breakfast buffets, business luncheons, and evening fine dining paired with curated vintage wines.
                  </p>
                  <ul className="slide-features">
                    <li>Curated international & Nigerian tasting menus</li>
                    <li>Private secluded alcoves for diplomatic lunches</li>
                    <li>Artisanal cocktail bar and barista coffee lounge</li>
                  </ul>
                </div>
                <a href="https://wa.me/2347086300440?text=I%20wish%20to%20reserve%20a%20table%20at%20Regent%20Hills" target="_blank" rel="noopener noreferrer" className="slide-cta">
                  Reserve a Table
                </a>
              </div>
            </article>

            {/* Slide 3: Diplomatic Conference Hall */}
            <article className="suite-card-slide">
              <div className="slide-media">
                <img src="/images/conference.jpg" alt="Diplomatic Conference Hall" />
              </div>
              <div className="slide-content">
                <div>
                  <span className="slide-tag">Summits</span>
                  <h3 className="slide-title">The Diplomatic Hall</h3>
                  <p className="slide-desc">
                    Engineered for discretion and productivity. Fully acoustically treated meeting spaces with integrated multi-screen presentation suites and VIP security access.
                  </p>
                  <ul className="slide-features">
                    <li>Hybrid broadcast video conferencing technology</li>
                    <li>Ergonomic executive leather seating for 120 guests</li>
                    <li>Tailored private banquet and catering service</li>
                  </ul>
                </div>
                <a href="https://wa.me/2347086300440?text=I%20wish%20to%20book%20the%20Conference%20Hall" target="_blank" rel="noopener noreferrer" className="slide-cta">
                  Book Conference
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: CONCIERGE & DETAILS (Step 5: Maitama Twilight) */}
      <section className="concierge-hero">
        <div className="concierge-left">
          <span className="kicker">Immediate Assistance</span>
          <h2>Experience Maitama’s Most Distinctive Retreat</h2>
          <p>
            Whether planning an extended diplomatic posting, hosting a confidential board summit, or seeking weekend respite in Abuja, our concierge remains at your disposal around the clock.
          </p>
          <div className="concierge-actions">
            <a href="https://wa.me/2347086300440" target="_blank" rel="noopener noreferrer" className="btn-luxury-terracotta">
              WhatsApp Concierge (+234 708 630 0440)
            </a>
            <a href="mailto:info@bonhotels.com" className="btn-luxury-outline">
              Email Front Desk
            </a>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(30px)', border: '1px solid var(--border-light)', borderRadius: '28px', padding: '48px', boxShadow: '0 16px 40px rgba(44, 40, 37, 0.05)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '24px', fontWeight: 500 }}>Arrival Information</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--terracotta)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>Address</span>
              <strong>3 Negro Crescent, Maitama, Abuja, Nigeria</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--terracotta)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>Direct Phone & WhatsApp</span>
              <strong>+234 708 630 0440</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--terracotta)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>Check-In & Check-Out</span>
              <strong>Arrival: 2:00 PM · Departure: 12:00 PM</strong>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL FOOTER */}
      <footer className="site-footer">
        <div className="footer-columns">
          <div>
            <div className="footer-big-brand">BON Hotel Maitama</div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', maxWidth: '380px', lineHeight: 1.7, fontWeight: 300 }}>
              3 Negro Crescent, Maitama, Abuja, Nigeria. Luxury boutique sanctuary in the diplomatic hub of Nigeria's Federal Capital Territory.
            </p>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><a href="#top">Residences</a></li>
              <li><a href="#top">Suites & Lofts</a></li>
              <li><a href="#top">Regent Hills Dining</a></li>
              <li><a href="#top">Diplomatic Hall</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="https://t.me/bonhotels" target="_blank" rel="noopener noreferrer">Telegram · @bonhotels</a></li>
              <li><a href="https://instagram.com/bonhotels" target="_blank" rel="noopener noreferrer">Instagram · @bonhotels</a></li>
              <li><a href="https://facebook.com/bonhotels" target="_blank" rel="noopener noreferrer">Facebook · @bonhotels</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal-bar">
          <div>&copy; 2026 BON Hotel Maitama. All rights reserved.</div>
          <div>Designed & Crafted by IconEdge Technologies LTD</div>
        </div>
      </footer>
    </main>
  );
}
