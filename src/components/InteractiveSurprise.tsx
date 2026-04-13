'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';

export default function InteractiveSurprise() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  const triggerSurprise = () => {
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
            numberOfPieces={600} 
            gravity={0.2} 
            colors={['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff', '#ffd1dc']}
            drawShape={ctx => {
              // Custom heart shape confetti
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(7.5, 4);
              ctx.bezierCurveTo(7.5, 3.7, 7, 2.5, 5, 2.5);
              ctx.bezierCurveTo(2, 2.5, 2, 6.25, 2, 6.25);
              ctx.bezierCurveTo(2, 9, 4, 11.2, 7.5, 14);
              ctx.bezierCurveTo(11, 11.2, 13, 9, 13, 6.25);
              ctx.bezierCurveTo(13, 6.25, 13, 2.5, 10, 2.5);
              ctx.bezierCurveTo(8.5, 2.5, 7.5, 3.7, 7.5, 4);
              ctx.fill();
              ctx.restore();
            }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showSurprise ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ type: "spring" }}
            className="flex flex-col items-center"
          >
            <p className="text-pink-600 mb-6 font-heading font-bold text-xl">One last magical thing...</p>
            <button
              onClick={triggerSurprise}
              className="bg-gradient-to-r from-pink-400 to-pink-500 px-10 py-6 rounded-[3rem] text-white font-heading font-black text-xl md:text-2xl shadow-[0_15px_30px_rgba(255,105,180,0.4)] hover:shadow-[0_20px_40px_rgba(255,105,180,0.6)] hover:-translate-y-2 transition-all flex items-center gap-4 relative overflow-hidden group border-4 border-white"
            >
              <Heart size={28} className="fill-white animate-pulse" />
              Click for a Secret ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.2, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 12,
              stiffness: 80,
              duration: 1 
            }}
            className="bg-white w-full max-w-sm rounded-[3rem] p-8 md:p-10 text-center relative overflow-hidden border-4 border-pink-200 shadow-[0_20px_50px_rgba(255,105,180,0.3)]"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mx-auto flex justify-center mb-6"
            >
              <Heart className="w-16 h-16 text-pink-500 fill-pink-400 drop-shadow-md" />
            </motion.div>

            <div className="font-heading font-medium text-pink-700 text-[19px] leading-relaxed whitespace-pre-wrap space-y-4">
              <p className="font-bold text-2xl text-pink-600">আমার খেপি,</p>
              <p>তুমি আমার জীবনে আসার পর থেকেই সবকিছু বদলে গেছে। তুমি আমার সুখ, আমার শান্তি, আমার নিজের একমাত্র আশ্রয় হয়ে উঠেছো। তোমাকে ছাড়া একটা দিনও আমি কল্পনা করতে পারি না।</p>
              <p>আমি শুধু তোমাকে আমার জীবনে চাই না… আমি তোমাকে চিরদিনের জন্য চাই।</p>
              
              <div className="bg-pink-50 p-6 rounded-3xl mt-6 border-2 border-pink-100">
                <p className="text-pink-500 font-bold mb-4">তাই আজ, আমার জীবনের সবচেয়ে গুরুত্বপূর্ণ প্রশ্নটা তোমাকে করছি…</p>
                <p className="text-3xl font-black text-pink-600 drop-shadow-sm">তুমি কি আমাকে বিয়ে করবে? 💍❤️</p>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
