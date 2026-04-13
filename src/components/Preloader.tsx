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
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff0f5] cute-bg"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.8),_transparent)] pointer-events-none"></div>
      
      {/* Floating background clouds/bubbles */}
      <motion.div className="absolute w-40 h-40 bg-white/40 rounded-full blur-2xl top-10 left-10" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} />
      <motion.div className="absolute w-60 h-60 bg-pink-100/60 rounded-full blur-3xl bottom-10 right-0" animate={{ y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 5 }} />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Heart className="w-20 h-20 text-pink-500 fill-pink-400 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-heading text-pink-600 glow-text drop-shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A Magical Journey ✨
        </motion.h1>

        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="mt-8 bg-white border-4 border-pink-400 px-8 py-3 rounded-full text-pink-500 font-heading text-xl shadow-[0_10px_20px_rgba(255,105,180,0.3)] hover:shadow-[0_15px_30px_rgba(255,105,180,0.5)] hover:bg-pink-50 transition-all font-bold tracking-wide flex items-center gap-2"
            >
              <Heart size={20} className="fill-pink-400" /> Let&apos;s Go! <Heart size={20} className="fill-pink-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
