'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Target date: April 18 of the current year (or next year if passed)
    const now = new Date();
    let target = new Date(now.getFullYear(), 3, 18); // Month is 0-indexed, so 3 is April
    if (now > target) {
      target = new Date(now.getFullYear() + 1, 3, 18);
    }

    const interval = setInterval(() => {
      const difference = target.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-8 text-center border-pink-500/20"
      >
        <h2 className="text-2xl font-heading text-pink-200 mb-6">Counting Down To Your Day</h2>
        
        <div className="flex justify-center gap-4 text-pink-100 font-heading">
          {Object.entries(timeLeft).map(([unit, value], i) => (
            <motion.div 
              key={unit}
              className="flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-pink-950/40 rounded-xl border border-pink-400/20 text-2xl font-bold mb-2 shadow-[0_0_10px_rgba(255,182,193,0.1)]">
                {value.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-pink-300/60 font-body">{unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
