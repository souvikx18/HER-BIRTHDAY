'use client';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';

const milestones = [
  { id: 1, title: 'The Day We Met', description: 'When two universes collided into one beautiful story.', icon: Stars },
  { id: 2, title: 'Our First Date', description: 'The moment my heart knew it had found its home.', icon: Heart },
  { id: 3, title: 'Countless Memories', description: 'Every laugh, every tear, making us stronger together.', icon: Sparkles },
];

export default function JourneyTimeline() {
  return (
    <section className="py-20 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-heading text-pink-200 glow-text mb-4">Our Magic Journey</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto"></div>
      </motion.div>

      <div className="relative border-l border-pink-500/30 ml-4 md:ml-8 space-y-12">
        {milestones.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="relative pl-8"
          >
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center glass bg-pink-900/50 border-pink-400/50 text-pink-300">
              <item.icon size={16} fill="currentColor" />
            </div>
            <div className="glass p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none"></div>
              <h3 className="text-xl font-heading text-pink-100 font-semibold mb-2">{item.title}</h3>
              <p className="text-pink-200/70 font-body text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
