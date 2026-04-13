'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const LOVE_QUOTES = [
  "Every heartbeat whispers your name… 💓",
  "In your arms is where I belong, forever...",
  "You are my today and all of my tomorrows ✨",
  "My love for you is infinite like the stars 🌟",
  "Being with you is all I ever want, always...",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % LOVE_QUOTES.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  // Seeded positions so they don't randomize on each render
  const particles = [
    { top: '8%',  left: '7%',  size: 20, dur: 6,  delay: 0,   type: 'heart' },
    { top: '15%', left: '85%', size: 16, dur: 7,  delay: 0.5, type: 'star' },
    { top: '30%', left: '93%', size: 22, dur: 5,  delay: 1,   type: 'heart' },
    { top: '60%', left: '5%',  size: 18, dur: 8,  delay: 0.3, type: 'star' },
    { top: '75%', left: '88%', size: 14, dur: 6.5,delay: 0.8, type: 'heart' },
    { top: '50%', left: '50%', size: 12, dur: 5.5,delay: 1.5, type: 'spark' },
    { top: '22%', left: '40%', size: 10, dur: 7,  delay: 2,   type: 'heart' },
    { top: '80%', left: '35%', size: 20, dur: 6,  delay: 0.2, type: 'star' },
    { top: '5%',  left: '60%', size: 15, dur: 8,  delay: 1.2, type: 'heart' },
    { top: '90%', left: '70%', size: 18, dur: 5,  delay: 0.6, type: 'spark' },
    { top: '40%', left: '2%',  size: 14, dur: 7,  delay: 1.8, type: 'heart' },
    { top: '65%', left: '60%', size: 12, dur: 6,  delay: 0.9, type: 'star' },
  ];

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 pb-16">

      {/* ── Radial Glow Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,182,193,0.5) 0%, rgba(255,240,245,0) 70%)',
        }} />
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #ffd1dc, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-35"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }} />
      </div>

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && particles.map((p, i) => {
          const Icon = p.type === 'heart' ? Heart : p.type === 'star' ? Star : Sparkles;
          const color = p.type === 'heart' ? 'text-pink-400' : p.type === 'star' ? 'text-yellow-400' : 'text-purple-400';
          return (
            <motion.div
              key={i}
              className={`absolute ${color}`}
              style={{ top: p.top, left: p.left }}
              animate={{ y: [0, -70, 0], rotate: [0, 180, 360], scale: [0.7, 1.3, 0.7], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            >
              <Icon size={p.size} fill="currentColor" />
            </motion.div>
          );
        })}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 mt-10 w-full max-w-lg mx-auto">

        {/* SURPRISE badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <div className="glass ring-pulse inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-pink-300 shadow-xl">
            <span className="twinkle">✨</span>
            <span className="font-heading text-pink-500 font-bold tracking-widest text-sm">MADE WITH LOVE</span>
            <span className="twinkle" style={{ animationDelay: '0.5s' }}>✨</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring' }}
        >
          <p className="font-heading text-pink-500 text-xl mb-2 tracking-wider">Happy Birthday, my love 🎂</p>
          <h1 className="font-heading font-black leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 5rem)' }}>
            <span className="gradient-text-love glow-text">MY LOVE</span>
            <br />
            <span
              className="font-cursive text-pink-600"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 6.5rem)', lineHeight: 1.1 }}
            >
              Inddu 💖
            </span>
          </h1>
        </motion.div>

        {/* Animated Quote Rotator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full"
        >
          <div className="glass-dark px-6 py-5 rounded-3xl border-2 border-white/70 shadow-xl relative overflow-hidden">
            <span className="quote-mark absolute -top-2 left-3">"</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="font-cursive text-pink-700 text-xl md:text-2xl leading-snug px-2"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {LOVE_QUOTES[quoteIdx]}
              </motion.p>
            </AnimatePresence>
            <span className="quote-mark absolute -bottom-8 right-3 rotate-180">"</span>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400" />
          <span className="font-cursive text-pink-500 text-lg" style={{ fontFamily: "'Dancing Script', cursive" }}>
            — Yours forever, Souvik —
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400" />
        </motion.div>

        {/* Love stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          {[
            { label: 'Times I Love You', value: '∞', icon: '💖' },
            { label: 'Happy Memories', value: '1000+', icon: '🌸' },
            { label: 'Forever Together', value: '1', icon: '💞' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07, rotate: 2 }}
              className="glass px-5 py-3 rounded-2xl text-center shadow-lg border border-white min-w-[90px]"
            >
              <div className="text-2xl mb-0.5">{stat.icon}</div>
              <div className="font-heading font-black text-pink-600 text-xl">{stat.value}</div>
              <div className="text-pink-400 text-xs font-bold mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </section>
  );
}
