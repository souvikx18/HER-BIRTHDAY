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
  const [isBdayHour, setIsBdayHour] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      
      // Check if it is the birthday hour: July 10, between 12:00 AM and 1:00 AM
      const isCurrentBdayHour = now.getMonth() === 6 && now.getDate() === 10 && now.getHours() === 0;
      setIsBdayHour(isCurrentBdayHour);

      // Determine target date.
      // If we are currently on or after July 10 1:00 AM of this year, target next year's July 10.
      let targetYear = now.getFullYear();
      const thresholdThisYear = new Date(targetYear, 6, 10, 1, 0, 0);
      if (now >= thresholdThisYear) {
        targetYear += 1;
      }
      const target = new Date(targetYear, 6, 10, 0, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    const factInterval = setInterval(() => {
      setFactIdx(p => (p + 1) % LOVE_FACTS.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(factInterval);
    };
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

          {isBdayHour ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="py-6 flex flex-col items-center justify-center space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl"
              >
                🎉💝
              </motion.div>
              <h2 className="font-heading font-black text-4xl md:text-5xl gradient-text-love glow-text leading-tight">
                Happy Birthday
                <br />
                My Love
              </h2>
              <p className="font-cursive text-pink-500 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                You are my whole world, today and forever... 💍✨
              </p>
              <div className="flex gap-2">
                {['💖', '🌸', '✨', '🌹', '💕'].map((em, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="text-2xl"
                  >
                    {em}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              <h2 className="font-heading font-black text-3xl gradient-text-love glow-text mb-2">
                Counting Down To You! 🎂
              </h2>
              <p className="text-pink-400 font-medium text-sm mb-8">July 10 — Your special day ✨</p>

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
            </>
          )}

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
