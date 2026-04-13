'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';

export default function InteractiveSurprise() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  const triggerSurprise = () => {
    // Only capture dimensions when clicking
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    setShowSurprise(true);
  };

  return (
    <section className="py-20 px-6 flex flex-col items-center justify-center relative min-h-[60vh]">
      {showSurprise && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowDimensions.width} 
            height={windowDimensions.height} 
            recycle={false} 
            numberOfPieces={400} 
            gravity={0.15} 
            colors={['#ffb6c1', '#8a2be2', '#ffd700', '#ff69b4', '#ffffff']}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showSurprise ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-pink-300 mb-6 font-heading italic">One last thing...</p>
            <button
              onClick={triggerSurprise}
              className="glass px-10 py-5 rounded-full text-pink-100 font-heading text-xl shadow-[0_0_20px_rgba(255,182,193,0.4)] hover:shadow-[0_0_40px_rgba(255,182,193,0.6)] hover:bg-pink-900/30 transition-all flex items-center gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              Click for a Secret Message ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.8 
            }}
            className="glass w-full max-w-sm rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden border border-pink-400/30 shadow-[0_0_50px_rgba(255,182,193,0.15)] bg-gradient-to-b from-pink-900/40 to-[#05040d]/90"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mx-auto flex justify-center mb-6"
            >
              <Heart className="w-12 h-12 text-pink-400 drop-shadow-[0_0_15px_rgba(255,182,193,0.8)]" fill="currentColor" />
            </motion.div>

            <div className="font-heading text-pink-100/90 text-lg md:text-xl leading-relaxed whitespace-pre-wrap space-y-4 font-medium Bengali-text">
              <p>আমার খেপি,</p>
              <p>তুমি আমার জীবনে আসার পর থেকেই সবকিছু বদলে গেছে। তুমি আমার সুখ, আমার শান্তি, আমার নিজের একমাত্র আশ্রয় হয়ে উঠেছো। তোমাকে ছাড়া একটা দিনও আমি কল্পনা করতে পারি না।</p>
              <p>আমি শুধু তোমাকে আমার জীবনে চাই না… আমি তোমাকে চিরদিনের জন্য চাই।</p>
              <p className="text-pink-300 mt-6 glow-text font-bold">তাই আজ, আমার জীবনের সবচেয়ে গুরুত্বপূর্ণ প্রশ্নটা তোমাকে করছি…</p>
              <p className="text-2xl mt-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">তুমি কি আমাকে বিয়ে করবে? 💍❤️</p>
            </div>
            
            <motion.div 
              className="absolute pointer-events-none inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0zM27.314 0l.83.83-27.314 27.314-.83-.83L27.314 0zm27.313 27.314l.83.83-27.313 27.313-.83-.83L54.627 27.314zM0 27.314l.83.83L0 28.974v-1.66z' fill='%23ffb6c1' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
