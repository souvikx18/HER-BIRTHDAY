'use client';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, Star } from 'lucide-react';

const milestones = [
  {
    id: 1,
    emoji: '🌟',
    title: 'The Day We Met',
    date: 'The Beginning',
    description: 'Two souls from different worlds found each other — and in that one moment, the universe smiled.',
    quote: '"Some souls just speak to each other without words."',
    icon: Stars,
    color: 'text-yellow-500',
    bg: 'from-yellow-50 to-pink-50',
    border: 'border-yellow-200',
    dot: 'bg-yellow-400',
  },
  {
    id: 2,
    emoji: '💕',
    title: 'Falling For You',
    date: 'Growing Closer',
    description: 'Every text, every laugh, every late-night call — I was falling deeper without even realizing it.',
    quote: '"You make ordinary days feel like fairytales."',
    icon: Heart,
    color: 'text-pink-500',
    bg: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    dot: 'bg-pink-500',
  },
  {
    id: 3,
    emoji: '🌸',
    title: 'Our First Date',
    date: 'Pure Magic',
    description: 'Time stopped. Everything felt warm and golden. My heart said — this is her, this is home.',
    quote: '"Your smile is my favourite sight in the world."',
    icon: Star,
    color: 'text-rose-500',
    bg: 'from-rose-50 to-purple-50',
    border: 'border-rose-200',
    dot: 'bg-rose-400',
  },
  {
    id: 4,
    emoji: '💫',
    title: 'Countless Memories',
    date: 'Every Single Day',
    description: 'Each laugh, each tear, each fight and make-up — every moment made us stronger and more beautiful.',
    quote: '"With you, even the hard days are worth it."',
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    dot: 'bg-purple-400',
  },
  {
    id: 5,
    emoji: '♾️',
    title: 'Forever & Always',
    date: 'Right Now & Beyond',
    description: 'Today, tomorrow, every single day after — I choose you. A million times over, I choose you.',
    quote: '"You are the love I have always prayed for."',
    icon: Heart,
    color: 'text-red-500',
    bg: 'from-red-50 to-pink-50',
    border: 'border-red-200',
    dot: 'bg-red-400',
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-24 px-5 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="text-center mb-20"
      >
        <span className="inline-block text-4xl mb-3 float">💖</span>
        <h2 className="font-heading font-black text-4xl md:text-5xl gradient-text-love glow-text mb-4">
          Our Love Story
        </h2>
        <p className="font-cursive text-pink-500 text-xl md:text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Written by the stars, lived by us ✨
        </p>
        <div className="mt-4 h-1 w-32 mx-auto rounded-full shimmer"
          style={{ background: 'linear-gradient(90deg, #ff69b4, #ff1493, #ff69b4)' }} />
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-lg mx-auto">
        {/* Central line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 z-0"
          style={{ background: 'linear-gradient(180deg, #fecdd3, #f9a8d4, #e879f9, #f9a8d4, #fecdd3)' }} />

        <div className="space-y-12">
          {milestones.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 90, delay: i * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                className={`absolute left-4 top-5 w-9 h-9 rounded-full flex items-center justify-center bg-white border-4 border-pink-300 shadow-lg z-10 ${item.dot}`}
                style={{ boxShadow: '0 0 0 4px white, 0 0 0 6px #fecdd3' }}
              >
                <span className="text-lg">{item.emoji}</span>
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 0.5 }}
                className={`bg-gradient-to-br ${item.bg} rounded-3xl p-6 border-2 ${item.border} shadow-[0_8px_30px_rgba(255,105,180,0.15)] relative overflow-hidden`}
              >
                {/* Tape sticker */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-pink-200/70 rounded-sm -rotate-2 backdrop-blur-sm" />

                {/* Date badge */}
                <span className="inline-block glass text-pink-500 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-pink-200">
                  {item.date}
                </span>

                <h3 className="font-heading text-2xl text-pink-600 font-black mb-2">{item.title}</h3>
                <p className="text-pink-800/80 font-medium leading-relaxed mb-4">{item.description}</p>

                {/* Quote */}
                <div className="glass-dark px-4 py-3 rounded-2xl border border-white/60">
                  <p className="font-cursive text-pink-600 text-lg italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {item.quote}
                  </p>
                </div>

                {/* Corner sparkle */}
                <span className="absolute top-3 right-4 text-xl twinkle">{i % 2 === 0 ? '✨' : '💫'}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16"
      >
        <p className="font-cursive text-pink-500 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
          This is just the beginning of forever... 💖
        </p>
      </motion.div>
    </section>
  );
}
