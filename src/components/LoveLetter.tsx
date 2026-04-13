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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <h2 className="text-2xl font-heading text-pink-300 mb-6 italic glow-text">A Note For You</h2>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-pink-100/90 leading-relaxed whitespace-pre-wrap text-[15px]"
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
