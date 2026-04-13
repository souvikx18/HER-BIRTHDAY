'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onStart: () => void;
}

const PRELOADER_HEARTS = [
  { top: '12%', left: '10%', size: 24, dur: 5, delay: 0 },
  { top: '20%', left: '80%', size: 18, dur: 6, delay: 0.5 },
  { top: '65%', left: '8%',  size: 20, dur: 7, delay: 1 },
  { top: '70%', left: '85%', size: 16, dur: 5, delay: 0.3 },
  { top: '40%', left: '90%', size: 14, dur: 8, delay: 1.5 },
  { top: '85%', left: '50%', size: 22, dur: 6, delay: 0.8 },
  { top: '5%',  left: '50%', size: 12, dur: 7, delay: 1.2 },
];

export default function Preloader({ onStart }: PreloaderProps) {
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsReady(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff0f8 0%, #ffd1dc 35%, #fce7f3 65%, #f5d0fe 100%)',
      }}
    >
      {/* Aurora layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #ffb6c1, transparent)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-3xl opacity-35"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #fda4af, transparent)' }} />
      </div>

      {/* Floating hearts background */}
      {mounted && PRELOADER_HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 pointer-events-none"
          style={{ top: h.top, left: h.left }}
          animate={{ y: [0, -60, 0], opacity: [0.25, 0.7, 0.25], rotate: [0, 20, -20, 0] }}
          transition={{ duration: h.dur, repeat: Infinity, delay: h.delay, ease: 'easeInOut' }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-6 text-center">
        {/* Pulsing heart */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="relative"
        >
          <Heart
            className="w-24 h-24 text-pink-500 fill-pink-400"
            style={{ filter: 'drop-shadow(0 0 24px rgba(255,105,180,0.9)) drop-shadow(0 0 48px rgba(255,20,147,0.5))' }}
          />
          {/* Ring pulse around heart */}
          <div className="absolute inset-0 rounded-full ring-pulse scale-150" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h1
            className="font-heading font-black text-4xl gradient-text-love glow-text"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
          >
            A Magical Surprise ✨
          </h1>
          <p
            className="font-cursive text-pink-500 text-xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Just for you, my love…
          </p>
        </motion.div>

        {/* Sparkle row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3 text-2xl"
        >
          {['💖', '🌸', '✨', '🌹', '💫'].map((em, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
            >
              {em}
            </motion.span>
          ))}
        </motion.div>

        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="shimmer mt-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 border-4 border-white/80 px-10 py-4 rounded-full text-white font-heading text-xl shadow-[0_15px_40px_rgba(255,105,180,0.5)] hover:shadow-[0_20px_50px_rgba(255,105,180,0.7)] transition-all font-black tracking-wide flex items-center gap-3 glow-box"
            >
              <Heart size={22} className="fill-white heartbeat" />
              Open the Surprise 💝
            </motion.button>
          )}
        </AnimatePresence>

        {!isReady && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-pink-400 font-heading text-sm tracking-widest"
          >
            Preparing something special…
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
