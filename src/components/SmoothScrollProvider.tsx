'use client';
import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true, touchMultiplier: 2, infinite: false }}>
      {children}
    </ReactLenis>
  );
}
