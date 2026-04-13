'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onStart: () => void;
}

export default function Preloader({ onStart }: PreloaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to make it feel deliberate
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05040d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-[#05040d] to-[#05040d]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart className="w-16 h-16 text-pink-400 drop-shadow-[0_0_15px_rgba(255,182,193,0.8)]" fill="currentColor" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-heading text-pink-100 glow-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A Special Journey Awaits...
        </motion.h1>

        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="mt-8 glass px-8 py-3 rounded-full text-pink-200 font-medium tracking-wide shadow-[0_0_20px_rgba(255,182,193,0.3)] hover:shadow-[0_0_30px_rgba(255,182,193,0.5)] transition-all"
            >
              Enter to Begin
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
