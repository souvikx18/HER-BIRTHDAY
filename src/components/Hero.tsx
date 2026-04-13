'use client';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Magical Floating Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && [...Array(15)].map((_, i) => {
          const Icon = i % 2 === 0 ? Heart : Star;
          return (
            <motion.div
              key={i}
              className={`absolute ${i % 2 === 0 ? 'text-pink-400' : 'text-yellow-400'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            >
              <Icon size={Math.random() * 10 + 15} fill="currentColor" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 mt-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
          className="mb-2"
        >
          <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border-2 border-pink-300 shadow-xl inline-flex items-center gap-2">
            <span className="animate-pulse">✨</span>
            <span className="font-heading text-pink-500 font-bold tracking-widest text-sm">SURPRISE</span>
            <span className="animate-pulse">✨</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-heading font-black text-pink-600 drop-shadow-[0_4px_4px_rgba(255,105,180,0.3)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
        >
          Happy Birthday, <br />
          <span className="text-5xl md:text-6xl mt-4 block text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-400 to-pink-600 glow-text drop-shadow-xl relative">
            <span className="absolute -top-4 -left-4 text-pink-300 rotate-12 text-3xl">✨</span>
            MY LOVE INDDU
            <span className="absolute -bottom-2 -right-2 text-pink-300 -rotate-12 text-3xl">💖</span>
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl font-heading font-bold text-pink-700 max-w-[90%] bg-white/50 backdrop-blur-sm px-6 py-4 rounded-3xl border-2 border-white shadow-lg mx-auto leading-snug"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        >
          &ldquo;Every moment with you feels like a dream I never want to wake up from...&rdquo;
        </motion.p>
        
        <motion.div 
          className="text-sm text-pink-500 font-heading font-bold tracking-widest mt-4 bg-white/80 px-4 py-2 rounded-full border border-pink-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          — Yours, Souvik —
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      >
        <div className="text-pink-400 animate-bounce bg-white/80 p-3 rounded-full shadow-lg border border-pink-200">
          <Heart size={24} className="fill-pink-400" />
        </div>
      </motion.div>
    </section>
  );
}
