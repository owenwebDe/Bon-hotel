import './globals.css';

export const metadata = {
  title: 'BON Hotel Maitama | Editorial Luxury Sanctuary in Abuja',
  description: 'BON Hotel Maitama, Abuja. 120 luxury residences, executive lofts, Regent Hills dining, conference hall, and outdoor pool oasis at 3 Negro Crescent, Maitama, Abuja, Nigeria.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay"></div>
        {children}
      </body>
    </html>
  );
}
