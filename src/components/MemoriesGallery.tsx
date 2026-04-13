'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

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
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring" }}
        className="text-center mb-12"
      >
        <span className="text-4xl">📸</span>
        <h2 className="text-4xl font-heading text-pink-600 drop-shadow-sm mt-3">Our Scrapbook</h2>
        <p className="text-pink-500 font-body font-bold mt-2 text-balance">
          Just a few frames of the millions of memories we share.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 px-2">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -10 : 10 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: i * 0.15 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
            className={`cursor-pointer polaroid flex flex-col items-center bg-white border border-pink-100 ${i === 0 || i === 3 ? 'aspect-[3/4]' : 'aspect-square'}`}
            onClick={() => setSelectedId(photo.id)}
          >
            {/* Cute Heart Sticker Pin */}
            <div className="absolute -top-3 text-pink-500 z-10 drop-shadow-md">
              <Heart size={24} fill="#ff69b4" />
            </div>

            <div className="w-full flex-grow bg-pink-100 border-2 border-pink-200 mt-2 flex items-center justify-center overflow-hidden">
              <span className="text-pink-400 font-bold font-body text-xs text-center px-2">
                [ Insert Pic {photo.id} ]
              </span>
            </div>
            
            <p className="text-pink-600 font-heading text-lg mt-3 text-center">{photo.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
