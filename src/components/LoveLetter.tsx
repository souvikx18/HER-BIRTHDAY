'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LETTER_LINES = [
  { text: "To my precious, wonderful Inddu,", bold: true, size: "text-xl" },
  { text: "" },
  { text: "From the moment you walked into my life, the world became more colourful.", size: "text-lg" },
  { text: "You turned my ordinary days into something magical — just by being you." },
  { text: "" },
  { text: "You are my happiness on cloudy days ☁️", italic: true },
  { text: "You are my peace when the world feels too loud 🌸", italic: true },
  { text: "You are my home wherever I am 🏡", italic: true },
  { text: "" },
  { text: "I can't imagine a single morning without your voice, a single night without your smile." },
  { text: "You make every little thing feel extraordinary." },
  { text: "" },
  { text: "You are everything I never knew I needed,", italic: true },
  { text: "and everything I'll never stop choosing. 💖", italic: true, bold: true },
  { text: "" },
  { text: "Happy Birthday, my love. Today is about YOU." },
  { text: "May every dream you carry bloom into something beautiful 🌹" },
  { text: "" },
  { text: "Forever yours,", bold: true },
  { text: "Souvik 💌", bold: true, size: "text-xl" },
];

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 px-5 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-4xl block mb-3 float">💌</span>
        <h2 className="font-heading font-black text-4xl md:text-5xl gradient-text-love glow-text">
          A Letter From My Heart
        </h2>
        <p className="font-cursive text-pink-400 text-lg mt-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Words I could never say enough times...
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        {/* Envelope toggle */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="shimmer relative bg-gradient-to-br from-pink-400 to-rose-400 text-white font-heading font-bold text-lg px-8 py-5 rounded-[2rem] shadow-[0_10px_40px_rgba(255,105,180,0.45)] border-4 border-white/60 flex items-center gap-3 glow-box"
            >
              <span className="text-2xl">💌</span>
              Open My Letter To You
              <span className="text-2xl heartbeat">💝</span>
            </motion.button>
            <p className="text-pink-400 text-sm mt-4 font-medium">Tap to unseal my heart...</p>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -6, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            className="relative"
          >
            {/* Paper */}
            <div
              className="relative rounded-2xl overflow-hidden border-2 border-[#f5e6b3] shadow-[8px_8px_30px_rgba(200,140,140,0.25),_-4px_-4px_20px_rgba(255,255,255,0.8)]"
              style={{
                background: '#fffef5',
                backgroundImage: 'linear-gradient(transparent 94%, #ffb6c1 94%)',
                backgroundSize: '100% 2.4rem',
                lineHeight: '2.4rem',
              }}
            >
              {/* Gradient top strip */}
              <div className="h-3 w-full"
                style={{ background: 'linear-gradient(90deg, #ffd1dc, #ffb6c1, #ff69b4, #ffb6c1, #ffd1dc)' }} />

              {/* Wax seal */}
              <div className="absolute top-3 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md"
                style={{ background: 'radial-gradient(circle, #ff69b4, #ff1493)' }}>
                💋
              </div>

              <div className="px-7 py-8 space-y-1">
                {LETTER_LINES.map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`block font-heading text-pink-800/90 tracking-wide ${line.bold ? 'font-bold' : 'font-medium'} ${line.italic ? 'italic' : ''} ${line.size ?? 'text-[17px]'}`}
                  >
                    {line.text || '\u00A0'}
                  </motion.span>
                ))}
              </div>

              {/* Bottom strip */}
              <div className="h-2 w-full"
                style={{ background: 'linear-gradient(90deg, #ffd1dc, #ffb6c1, #ff69b4, #ffb6c1, #ffd1dc)' }} />
            </div>

            {/* Decorative hearts */}
            {['💖', '🌸', '✨', '💕', '🌹'].map((em, i) => (
              <motion.span
                key={i}
                className="absolute text-xl pointer-events-none"
                style={{
                  top: `${[10, 70, 20, 80, 50][i]}%`,
                  left: i % 2 === 0 ? '-2rem' : 'calc(100% + 0.5rem)',
                }}
                animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                {em}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
