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
  emoji: string;
  type: 'heart' | 'emoji';
}

const COLORS = [
  '#ff69b4', '#ff1493', '#ffb6c1', '#ff8dc7',
  '#f472b6', '#ec4899', '#db2777', '#fda4af',
];

const EMOJIS = ['💖', '💕', '💗', '💓', '💞', '🌸', '✨', '💝', '🌹', '💫'];

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.beginPath();
  const s = size * 0.1;
  ctx.moveTo(x, y + s * 2);
  ctx.bezierCurveTo(x, y, x - s * 3.5, y, x - s * 3.5, y + s * 2.5);
  ctx.bezierCurveTo(x - s * 3.5, y + s * 5, x, y + s * 7, x, y + s * 9);
  ctx.bezierCurveTo(x, y + s * 7, x + s * 3.5, y + s * 5, x + s * 3.5, y + s * 2.5);
  ctx.bezierCurveTo(x + s * 3.5, y, x, y, x, y + s * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (): HeartParticle => ({
      x: Math.random() * window.innerWidth,
      y: -50,
      size: Math.random() * 22 + 10,
      speedY: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      type: Math.random() > 0.5 ? 'heart' : 'emoji',
    });

    // Seed with initial particles spread across entire height
    for (let i = 0; i < 35; i++) {
      const p = spawnParticle();
      p.y = Math.random() * window.innerHeight;
      particlesRef.current.push(p);
    }

    let frameCount = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Spawn new particles every ~20 frames
      if (frameCount % 20 === 0) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter(p => p.y < canvas.height + 80);

      particlesRef.current.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.5;
        p.rotation += p.rotationSpeed;
        p.opacity += Math.sin(p.y * 0.02) * 0.002;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.opacity));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'emoji') {
          ctx.font = `${p.size * 1.4}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          drawHeart(ctx, 0, -p.size * 0.45, p.size);
        }
        ctx.restore();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
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
      }}
    />
  );
}
