'use client';
import { motion } from 'framer-motion';

export default function LoveLetter() {
  const letter = "To my precious Inddu,\n\nFrom the moment you walked into my life, everything changed. You became my happiness, my peace, and my safest shelter. I can't imagine a single day without you by my side. You make every ordinary moment feel extraordinary, just by being you.\n\nForever yours,\nSouvik";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.5 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: 10, scale: 0.9 },
  };

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 80 }}
        className="bg-[#fff9e6] rounded-sm p-8 md:p-10 relative overflow-hidden shadow-[5px_5px_15px_rgba(200,150,150,0.3)] border border-[#f5e6b3]"
        style={{
          backgroundImage: 'linear-gradient(transparent 95%, #ffb6c1 95%)',
          backgroundSize: '100% 2.3rem',
          lineHeight: '2.3rem',
        }}
      >
        <div className="absolute top-2 left-2 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-300"></div>
          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
        </div>
        
        <h2 className="text-3xl font-heading text-pink-600 mb-6 text-center mt-2">A Lil Note For You 💌</h2>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-pink-700/90 whitespace-pre-wrap text-[18px] tracking-wide"
        >
          {Array.from(letter).map((char, index) => (
            <motion.span variants={child} key={index}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
