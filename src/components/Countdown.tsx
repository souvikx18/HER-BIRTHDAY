'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const LOVE_FACTS = [
  "Every second that ticks by, my love for you grows stronger 💖",
  "Time is precious — and every moment with you is a treasure 🌸",
  "The countdown to your day fills my heart with joy ✨",
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [factIdx, setFactIdx] = useState(0);
  const [prevSeconds, setPrevSeconds] = useState(0);

  useEffect(() => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 3, 18);
    if (now > target) target = new Date(now.getFullYear() + 1, 3, 18);

    const interval = setInterval(() => {
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) { clearInterval(interval); return; }
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: s,
      });
      setPrevSeconds(s);
    }, 1000);

    const factInterval = setInterval(() => {
      setFactIdx(p => (p + 1) % LOVE_FACTS.length);
    }, 4000);

    return () => { clearInterval(interval); clearInterval(factInterval); };
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days, emoji: '🌅', color: 'from-pink-200 to-pink-300' },
    { label: 'Hours', value: timeLeft.hours, emoji: '⏰', color: 'from-rose-200 to-rose-300' },
    { label: 'Minutes', value: timeLeft.minutes, emoji: '⚡', color: 'from-purple-200 to-pink-200' },
    { label: 'Seconds', value: timeLeft.seconds, emoji: '💫', color: 'from-pink-100 to-rose-200' },
  ];

  return (
    <section className="py-20 px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="max-w-lg mx-auto"
      >
        {/* Card */}
        <div className="relative glass rounded-[2.5rem] p-8 text-center border-4 border-pink-200 shadow-[0_20px_60px_rgba(255,105,180,0.22)] overflow-hidden">
          {/* Shimmer stripe */}
          <div className="absolute inset-0 pointer-events-none shimmer rounded-[2.5rem]" />

          {/* Floating background hearts */}
          {['💗', '💖', '✨', '🌸'].map((em, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl opacity-20 pointer-events-none select-none"
              style={{
                top: `${[10, 75, 30, 65][i]}%`,
                left: `${[5, 88, 50, 20][i]}%`,
              }}
              animate={{ y: [0, -12, 0], rotate: [0, 20, -20, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            >
              {em}
            </motion.span>
          ))}

          {/* Pulsing heart header */}
          <motion.div className="mb-6 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="relative"
            >
              <Heart className="w-14 h-14 text-pink-500 fill-pink-400 drop-shadow-[0_0_20px_rgba(255,105,180,0.8)]" />
              <div className="absolute inset-0 rounded-full ring-pulse" />
            </motion.div>
          </motion.div>

          <h2 className="font-heading font-black text-3xl gradient-text-love glow-text mb-2">
            Counting Down To You! 🎂
          </h2>
          <p className="text-pink-400 font-medium text-sm mb-8">April 18 — Your special day ✨</p>

          {/* Countdown tiles */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  key={unit.value}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full aspect-square flex flex-col items-center justify-center bg-gradient-to-br ${unit.color} rounded-2xl border-4 border-white shadow-lg mb-2 relative overflow-hidden cursor-default`}
                >
                  <span className="text-xs mb-0.5">{unit.emoji}</span>
                  <span className="font-heading font-black text-pink-700 text-2xl md:text-3xl leading-none">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </motion.div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-500">{unit.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Rotating love fact */}
          <div className="glass-dark px-5 py-4 rounded-2xl border border-white/60">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="font-cursive text-pink-600 text-lg"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {LOVE_FACTS[factIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
