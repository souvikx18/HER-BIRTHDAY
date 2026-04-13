'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Target date: April 18
    const now = new Date();
    let target = new Date(now.getFullYear(), 3, 18); 
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
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 text-center border-4 border-pink-200 shadow-[0_15px_30px_rgba(255,105,180,0.2)]"
      >
        <span className="text-4xl block mb-2">🎈</span>
        <h2 className="text-3xl font-heading font-black text-pink-500 mb-6 drop-shadow-sm">Counting Down To Your Day!</h2>
        
        <div className="flex justify-center gap-3 md:gap-4 font-heading">
          {Object.entries(timeLeft).map(([unit, value], i) => (
            <motion.div 
              key={unit}
              className="flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-tr from-pink-200 to-pink-100 rounded-2xl border-4 border-white text-3xl font-black text-pink-600 mb-2 shadow-lg">
                {value.toString().padStart(2, '0')}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-pink-500">{unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
