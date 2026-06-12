import type { Metadata }  from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Navbar }           from '@/components/layout/Navbar';
import { Footer }           from '@/components/layout/Footer';
import { WhatsAppButton }   from '@/components/layout/WhatsAppButton';
import './globals.css';

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-display',
  display:  'swap',
});

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-body',
  display:  'swap',
});

export const metadata: Metadata = {
  title:       'Savory Haven | Port Harcourt',
  description: 'Fresh Nigerian cuisine in the heart of Port Harcourt. Reserve your table today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}