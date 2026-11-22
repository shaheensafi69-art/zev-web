import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recharge ZEV Coins | Official Top-Up Portal',
  description: 'Official direct web portal for ZEV Virtual Coins. 0% platform surcharge with instant delivery to your ZEV account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CoinsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
