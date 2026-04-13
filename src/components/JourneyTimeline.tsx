'use client';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';

const milestones = [
  { id: 1, title: 'The Day We Met', description: 'When two universes collided into one beautiful story.', icon: Stars, color: 'text-yellow-500' },
  { id: 2, title: 'Our First Date', description: 'The moment my heart knew it had found its home.', icon: Heart, color: 'text-pink-500' },
  { id: 3, title: 'Countless Memories', description: 'Every laugh, every tear, making us stronger together.', icon: Sparkles, color: 'text-purple-500' },
];

export default function JourneyTimeline() {
  return (
    <section className="py-20 px-6 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-heading text-pink-600 drop-shadow-sm mb-4">Our Magic Journey</h2>
        <div className="h-2 w-24 bg-pink-300 rounded-full mx-auto"></div>
      </motion.div>

      <div className="relative border-l-4 border-dashed border-pink-300 ml-6 md:ml-10 space-y-16">
        {milestones.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: i % 2 === 0 ? 2 : -2 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, delay: i * 0.2 }}
            className="relative pl-10"
          >
            {/* Cute connector pin */}
            <div className="absolute -left-[23px] top-4 w-10 h-10 rounded-full flex items-center justify-center bg-white border-4 border-pink-300 shadow-md z-10">
              <item.icon size={20} className={item.color} fill="currentColor" />
            </div>
            
            {/* Cute polaroid milestone */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_10px_25px_rgba(255,105,180,0.2)] border-2 border-pink-100 relative">
              {/* Cute tape sticker */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-pink-200/60 backdrop-blur-sm -rotate-3 rounded-sm"></div>
              
              <h3 className="text-2xl font-heading text-pink-500 mb-2 mt-2">{item.title}</h3>
              <p className="text-pink-800/70 font-body text-lg font-medium leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
