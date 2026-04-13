import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Happy Birthday, My Love ❤️',
  description: 'A magical journey of our love',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* The main wrapper forces the site to look like a mobile app even on desktop */}
        <main className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-black/20">
          {children}
        </main>
      </body>
    </html>
  );
}
