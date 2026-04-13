'use client';
import { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

const COLORS = [
  '#ff69b4', '#ff1493', '#ffb6c1', '#f472b6', '#ec4899',
];

// Pre-built heart path as a Path2D for reuse — much faster than bezierCurveTo every frame
function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size * 0.1;
  ctx.beginPath();
  ctx.moveTo(x, y + s * 2);
  ctx.bezierCurveTo(x, y, x - s * 3.5, y, x - s * 3.5, y + s * 2.5);
  ctx.bezierCurveTo(x - s * 3.5, y + s * 5, x, y + s * 7, x, y + s * 9);
  ctx.bezierCurveTo(x, y + s * 7, x + s * 3.5, y + s * 5, x + s * 3.5, y + s * 2.5);
  ctx.bezierCurveTo(x + s * 3.5, y, x, y, x, y + s * 2);
  ctx.closePath();
  ctx.fill();
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // willReadFrequently=false since we only write, never read pixels
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);

    const spawnParticle = (): HeartParticle => ({
      x: Math.random() * window.innerWidth,
      y: -50,
      size: Math.random() * 16 + 8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.45 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    // Seed only 15 particles (was 35) spread across the screen
    for (let i = 0; i < 15; i++) {
      const p = spawnParticle();
      p.y = Math.random() * window.innerHeight;
      particlesRef.current.push(p);
    }

    let frameCount = 0;
    // Target ~30fps instead of 60fps for background animations
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const animate = (timestamp: number) => {
      animRef.current = requestAnimationFrame(animate);

      // Throttle to 30fps
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Spawn new particle every ~40 frames (was 20)
      if (frameCount % 40 === 0 && particlesRef.current.length < 20) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter(p => p.y < canvas.height + 60);

      // Batch by color to minimize fillStyle changes
      const byColor: Record<string, HeartParticle[]> = {};
      for (const p of particlesRef.current) {
        if (!byColor[p.color]) byColor[p.color] = [];
        byColor[p.color].push(p);

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.018) * 0.35;
        p.rotation += p.rotationSpeed;
      }

      // No shadow blur — biggest perf win
      ctx.shadowBlur = 0;

      for (const [color, group] of Object.entries(byColor)) {
        ctx.fillStyle = color;
        for (const p of group) {
          ctx.save();
          ctx.globalAlpha = Math.max(0.1, Math.min(0.75, p.opacity));
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawHeart(ctx, 0, -p.size * 0.45, p.size);
          ctx.restore();
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  );
}
