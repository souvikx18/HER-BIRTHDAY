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

    touchRef.current = new Audio('/touch.mp3');
    touchRef.current.volume = 0.6; // Slightly louder than bgm for clear feedback

    const handleFirstInteraction = () => {
      if (!hasInteracted && bgmRef.current) {
        // Start background music on first tap
        bgmRef.current.play().catch(e => console.log('Audio play failed:', e));
        setHasInteracted(true);
      }

      // Play soft touch sound on every tap
      if (touchRef.current) {
        touchRef.current.currentTime = 0; // Reset to start
        touchRef.current.play().catch(e => console.log('Touch sound failed', e));
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
