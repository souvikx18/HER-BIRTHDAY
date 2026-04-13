'use client';
import { useState, useRef, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import JourneyTimeline from '@/components/JourneyTimeline';
import MemoriesGallery from '@/components/MemoriesGallery';
import LoveLetter from '@/components/LoveLetter';
import Countdown from '@/components/Countdown';
import InteractiveSurprise from '@/components/InteractiveSurprise';

export default function Home() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element dynamically to avoid SSR issues
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      // Audio play might be blocked if 'song.mp3' doesn't exist yet, so we catch the error gracefully.
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <>
      {/* We keep the preloader in DOM until started, then it animates out */}
      {!started && <Preloader onStart={handleStart} />}
      
      {/* The main content */}
      <div className={`transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Hero />
        <JourneyTimeline />
        <MemoriesGallery />
        <LoveLetter />
        <Countdown />
        <InteractiveSurprise />
        
        {/* Footer padding so surprise has space */}
        <div className="pb-20"></div>
      </div>
    </>
  );
}
