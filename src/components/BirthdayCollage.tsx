'use client';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Reduced from 24 to 8 sparkles — and using CSS animations not Framer Motion
const SPARKLE_STYLES = [
  { top: '5%', left: '10%', size: 8, color: '#ff69b4', delay: '0s', dur: '2s' },
  { top: '10%', left: '88%', size: 10, color: '#ffd700', delay: '0.4s', dur: '2.5s' },
  { top: '50%', left: '95%', size: 7, color: '#ff1493', delay: '0.8s', dur: '1.8s' },
  { top: '80%', left: '92%', size: 9, color: '#00cfff', delay: '0.2s', dur: '2.2s' },
  { top: '85%', left: '5%', size: 8, color: '#a855f7', delay: '1s', dur: '2s' },
  { top: '40%', left: '2%', size: 10, color: '#ff6b35', delay: '0.6s', dur: '2.4s' },
  { top: '20%', left: '50%', size: 6, color: '#ff69b4', delay: '1.2s', dur: '1.6s' },
  { top: '65%', left: '50%', size: 7, color: '#ffd700', delay: '0.3s', dur: '2.8s' },
];

export default function BirthdayCollage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reduced spring stiffness for smoother, cheaper transforms
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(true);
    new Audio('/touch.mp3').play().catch(console.error);
    const burst = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      emoji: ['💖', '🌸', '✨', '💫', '🎉', '🌺'][i % 6],
    }));
    setParticles(burst);
    setTimeout(() => { setClicked(false); setParticles([]); }, 1500);
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden flex flex-col items-center">
      {/* Lightweight CSS-only aurora — no Framer Motion */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="collage-aurora" />
        <div className="collage-aurora-2" />
      </div>

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-12"
      >
        <p className="font-heading text-pink-500 tracking-[0.3em] text-sm uppercase mb-2 twinkle">
          ✨ July 10 — The Most Special Day ✨
        </p>
        <h2
          className="font-heading font-black leading-tight"
          style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}
        >
          <span className="gradient-text-love glow-text">Our</span>
          {' '}
          <span
            className="font-cursive text-pink-600"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}
          >
            Memories
          </span>
          {' '}
          <span className="gradient-text-love glow-text">💖</span>
        </h2>
        {/* CSS animation underbar — no Framer Motion needed */}
        <div
          className="h-1 rounded-full mx-auto mt-3 shimmer"
          style={{ background: 'linear-gradient(90deg, #ff69b4, #ffd700, #ff1493, #a855f7)', width: '60%' }}
        />
      </motion.div>

      {/* Main card area */}
      <div className="relative z-10 w-full max-w-sm mx-auto" style={{ perspective: '900px' }}>

        {/* CSS sparkle dots — GPU-composited, zero JS cost */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
          {SPARKLE_STYLES.map((sp, i) => (
            <div
              key={i}
              className="absolute rounded-full collage-sparkle"
              style={{
                top: sp.top,
                left: sp.left,
                width: sp.size,
                height: sp.size,
                background: sp.color,
                boxShadow: `0 0 ${sp.size * 2}px ${sp.color}`,
                animationDelay: sp.delay,
                animationDuration: sp.dur,
              }}
            />
          ))}
        </div>

        {/* 3D tilt card */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: 'pointer', willChange: 'transform' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Pulsing glow — CSS animation, cheaper than Framer Motion loop */}
          <div className="absolute -inset-1 rounded-3xl z-0 pointer-events-none collage-glow-border" />

          {/* Holographic shimmer — pure CSS */}
          <div className="relative z-10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl shimmer" style={{ opacity: 0.4 }} />

            {/* Click burst particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                className="absolute text-xl z-30 pointer-events-none select-none"
                style={{ top: '50%', left: '50%' }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: [0, 1.4, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}

            {/* THE IMAGE — filter only changes on click/hover, not every frame */}
            <img
              src="/birthday-collage.png"
              alt="Happy Birthday My Love - Memories Collage"
              className="w-full h-auto block"
              style={{
                filter: clicked
                  ? 'brightness(1.4) saturate(2) hue-rotate(20deg)'
                  : hovered
                    ? 'brightness(1.06) saturate(1.2)'
                    : 'brightness(1)',
                transition: 'filter 0.3s ease',
                willChange: 'filter',
              }}
            />

            {/* Bottom gradient text overlay — static, no animation */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 p-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
            >
              <p
                className="font-cursive text-white text-center text-xl collage-glow-text"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Happy Birthday, My Love 💖
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tap hint — CSS pulse */}
        <p className="text-center text-pink-400 text-xs mt-4 font-heading tracking-widest" style={{ animation: 'pulse 2s infinite' }}>
          TAP THE PHOTO FOR MAGIC ✨
        </p>
      </div>

      {/* Bottom floating emoji row — 6 instead of 10, staggered CSS */}
      <motion.div
        className="relative z-10 flex gap-4 mt-10 flex-wrap justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {['💖', '🌸', '💫', '🌺', '✨', '💝'].map((em, i) => (
          <span
            key={i}
            className="text-2xl select-none float"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {em}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
