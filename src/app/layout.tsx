import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://zevapp.com'),
  title: 'ZEV - The Next-Gen Social Network | zevapp.com',
  description:
    'Real People. Real Connections. Discover amazing creators, share stunning reels, and connect with friends across Afghanistan and worldwide.',
  icons: {
    icon: '/assets/icon-clean.png',
    apple: '/assets/icon-clean.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
