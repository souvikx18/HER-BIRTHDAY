'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Particles Generation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-300 opacity-20"
            style={{
              width: Math.random() * 10 + 4,
              height: Math.random() * 10 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <motion.h1 
          className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-200 drop-shadow-[0_0_15px_rgba(255,182,193,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Happy Birthday,<br />
          <span className="text-5xl md:text-6xl mt-2 block tracking-wider glow-text text-pink-100">
            MY LOVE INDDU <span className="inline-block text-red-500">❤️</span>
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl font-body font-light text-pink-100/90 italic max-w-[90%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          &ldquo;Every moment with you feels like a dream I never want to wake up from...&rdquo;
        </motion.p>
        
        <motion.div 
          className="text-sm text-pink-300/60 font-body uppercase tracking-widest mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          — Yours, Souvik —
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-pink-300/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-pink-300 rounded-full"
            animate={{ y: [0, 15] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
