import type { Metadata } from 'next';
import { Quicksand, Fredoka, Dancing_Script } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });
const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing', weight: ['400', '700'] });

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
      <body className={`${quicksand.variable} ${fredoka.variable} ${dancingScript.variable} font-sans antialiased bg-pink-50`}>
        {/* The main wrapper forces the site to look like a mobile app even on desktop */}
        <main className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden cute-bg">
          {children}
        </main>
      </body>
    </html>
  );
}
