'use client';
import { useEffect, useRef, useState } from 'react';

export default function AudioController() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const touchRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize audio objects
    bgmRef.current = new Audio('/song.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4; // Soft background volume

    const handleFirstInteraction = () => {
      if (!hasInteracted && bgmRef.current) {
        // Start background music on first tap
        bgmRef.current.play().catch(e => console.log('Audio play failed:', e));
        setHasInteracted(true);
      }
    };

    // Attach to the whole window
    window.addEventListener('pointerdown', handleFirstInteraction);

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, [hasInteracted]);

  return null; // This component handles audio silently, no UI
}
