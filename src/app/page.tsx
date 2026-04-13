'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import BirthdayCollage from '@/components/BirthdayCollage';
import JourneyTimeline from '@/components/JourneyTimeline';
import LoveLetter from '@/components/LoveLetter';
import Countdown from '@/components/Countdown';
import InteractiveSurprise from '@/components/InteractiveSurprise';
import FloatingHearts from '@/components/FloatingHearts';

export default function Home() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <>
      {!started && <Preloader onStart={handleStart} />}

      {/* Falling hearts canvas — always visible once started */}
      {started && <FloatingHearts />}

      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          started ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
        }`}
      >
        <Hero />

        {/* Divider */}
        <div className="flex items-center gap-4 px-8 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-2xl">🎂</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <BirthdayCollage />

        {/* Divider */}
        <div className="flex items-center gap-4 px-8 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-2xl">💞</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <JourneyTimeline />

        <div className="flex items-center gap-4 px-8 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-2xl">💌</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <LoveLetter />

        <div className="flex items-center gap-4 px-8 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-2xl">🎂</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <Countdown />

        <div className="flex items-center gap-4 px-8 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-2xl">💍</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <InteractiveSurprise />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 px-6 text-center space-y-4"
        >
          <div className="flex justify-center gap-3 text-2xl">
            {['💖', '🌸', '✨', '🌹', '💫', '🌺', '💕'].map((em, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {em}
              </motion.span>
            ))}
          </div>
          <p
            className="font-cursive text-pink-500 text-2xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Made with every ounce of love, just for you, Inddu 💖
          </p>
          <div className="flex items-center justify-center gap-2 text-pink-400 text-sm font-heading font-bold">
            <Heart size={14} className="fill-pink-400" />
            <span>Souvik &amp; Inddu — Forever</span>
            <Heart size={14} className="fill-pink-400" />
          </div>
        </motion.footer>

        <div className="pb-10" />
      </div>
    </>
  );
}
