'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Using placeholder strings that the user can later replace with actual image paths, e.g., '/images/pic1.jpg'
const photos = [
  { id: 1, src: '/placeholder-1.jpg', text: 'Our beautiful moment' },
  { id: 2, src: '/placeholder-2.jpg', text: 'Forever smiling with you' },
  { id: 3, src: '/placeholder-3.jpg', text: 'Where I belong' },
  { id: 4, src: '/placeholder-4.jpg', text: 'Just you and me' },
];

export default function MemoriesGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-heading text-pink-200 glow-text">Our Memories</h2>
        <p className="text-pink-300/60 font-body text-sm mt-3 text-balance">
          Just a few frames of the millions of memories we share.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
            className={`relative rounded-xl overflow-hidden glass ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`}
            onClick={() => setSelectedId(photo.id)}
          >
            {/* 
              This is a placeholder div for the image.
              In a real scenario, replace this div with:
              <img src={photo.src} alt="Us" className="w-full h-full object-cover" />
            */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-800/40 to-purple-900/40 flex items-center justify-center p-4 text-center">
              <span className="text-pink-200/50 font-body text-xs tracking-wider">
                [ Insert Image {photo.id} Here ]
              </span>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full hover:translate-y-0 transition-transform duration-300">
              <p className="text-pink-100 text-sm font-heading">{photo.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
