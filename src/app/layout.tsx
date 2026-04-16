import type { Metadata } from 'next';
import { Quicksand, Fredoka, Dancing_Script } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AudioController from '@/components/AudioController';

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
    <html lang="en" style={{ overflowX: 'hidden' }}>
      <body className={`${quicksand.variable} ${fredoka.variable} ${dancingScript.variable} font-sans antialiased bg-pink-50`}>
        <AudioController />
        <SmoothScrollProvider>
          <main className="max-w-md mx-auto min-h-screen relative shadow-2xl cute-bg">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
