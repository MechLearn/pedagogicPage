import React, { useEffect, useRef } from 'react';

export type SimulationMode = 'molecular' | 'laminar' | 'difusion';

interface BioLabCanvasProps {
  mode: SimulationMode;
  cleanView?: boolean;
}

type ScienceTone = 'emerald' | 'sky' | 'violet' | 'amber';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  tone: ScienceTone;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const BioLabCanvas: React.FC<BioLabCanvasProps> = ({ mode, cleanView = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<SimulationMode>(mode);
  const cleanViewRef = useRef<boolean>(cleanView);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    cleanViewRef.current = cleanView;
  }, [cleanView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationId = 0;
    let time = 0;

    const pointer = {
      x: width * 0.5,
      y: height * 0.45,
      active: false,
      vx: 0,
      vy: 0,
    };

    const ripples: Ripple[] = [];
    let particles: Particle[] = [];
    const tones: ScienceTone[] = ['emerald', 'sky', 'violet', 'amber'];
    const ripplePalette = ['5, 150, 105', '2, 132, 199', '124, 58, 237', '217, 119, 6'];
    let rippleIdx = 0;

    const createParticles = () => {
      const count = Math.min(86, Math.max(44, Math.floor((width * height) / 20000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.58,
        vy: (Math.random() - 0.5) * 0.58,
        radius: 3.3 + (i % 4) * 1.4,
        phase: Math.random() * Math.PI * 2,
        tone: tones[i % tones.length],
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.vx = e.clientX - pointer.x;
      pointer.vy = e.clientY - pointer.y;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        !cleanViewRef.current &&
        target &&
        target.closest('button, a, input, select, textarea, label, [role="dialog"], [role="switch"]')
      ) {
        return;
      }

      const color = ripplePalette[rippleIdx % ripplePalette.length];
      rippleIdx += 1;

      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.44 + 120,
        alpha: 0.62,
        color,
      });

      if (modeRef.current === 'molecular') {
        for (const p of particles) {
          const dx = p.x - e.clientX;
          const dy = p.y - e.clientY;
          const dist = Math.hypot(dx, dy);
          if (dist < 250 && dist > 1) {
            const impulse = ((250 - dist) / 250) * 3.5;
            p.vx += (dx / dist) * impulse;
            p.vy += (dy / dist) * impulse;
          }
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('click', handleClick);

    const toneColors: Record<
      ScienceTone,
      { core: string; membrane: string; border: string; rgb: string }
    > = {
      emerald: {
        core: 'rgba(5, 150, 105, 0.8)',
        membrane: 'rgba(16, 185, 129, 0.18)',
        border: 'rgba(5, 150, 105, 0.28)',
        rgb: '5, 150, 105',
      },
      sky: {
        core: 'rgba(2, 132, 199, 0.8)',
        membrane: 'rgba(56, 189, 248, 0.18)',
        border: 'rgba(2, 132, 199, 0.28)',
        rgb: '2, 132, 199',
      },
      violet: {
        core: 'rgba(124, 58, 237, 0.78)',
        membrane: 'rgba(167, 139, 250, 0.18)',
        border: 'rgba(124, 58, 237, 0.26)',
        rgb: '124, 58, 237',
      },
      amber: {
        core: 'rgba(217, 119, 6, 0.78)',
        membrane: 'rgba(251, 191, 36, 0.18)',
        border: 'rgba(217, 119, 6, 0.26)',
        rgb: '217, 119, 6',
      },
    };

    const drawBackdrop = () => {
      ctx.clearRect(0, 0, width, height);

      // Degradados científicos luminosos: cian (Física), esmeralda (Biología), violeta (Química) y ámbar (Energía)
      const gradSky = ctx.createRadialGradient(
        width * 0.14,
        height * 0.16,
        20,
        width * 0.14,
        height * 0.16,
        Math.max(width, height) * 0.55
      );
      gradSky.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      gradSky.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = gradSky;
      ctx.fillRect(0, 0, width, height);

      const gradEmerald = ctx.createRadialGradient(
        width * 0.52,
        height * 0.28,
        20,
        width * 0.52,
        height * 0.28,
        Math.max(width, height) * 0.5
      );
      gradEmerald.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      gradEmerald.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = gradEmerald;
      ctx.fillRect(0, 0, width, height);

      const gradViolet = ctx.createRadialGradient(
        width * 0.86,
        height * 0.22,
        20,
        width * 0.86,
        height * 0.22,
        Math.max(width, height) * 0.52
      );
      gradViolet.addColorStop(0, 'rgba(139, 92, 246, 0.11)');
      gradViolet.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = gradViolet;
      ctx.fillRect(0, 0, width, height);

      const gradAmber = ctx.createRadialGradient(
        width * 0.78,
        height * 0.84,
        20,
        width * 0.78,
        height * 0.84,
        Math.max(width, height) * 0.5
      );
      gradAmber.addColorStop(0, 'rgba(245, 158, 11, 0.1)');
      gradAmber.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = gradAmber;
      ctx.fillRect(0, 0, width, height);
    };

    const drawRipples = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4.4;
        r.alpha *= 0.968;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${r.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        if (r.radius > 28) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${(r.alpha * 0.5).toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        if (r.alpha < 0.015 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }
    };

    const renderMolecular = () => {
      const linkDist = cleanViewRef.current ? 148 : 132;
      const cursorDist = 180;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.phase += 0.016;
          p.x += p.vx + Math.sin(p.phase) * 0.15;
          p.y += p.vy + Math.cos(p.phase * 0.9) * 0.15;

          p.vx *= 0.992;
          p.vy *= 0.992;

          const speed = Math.hypot(p.vx, p.vy);
          if (speed < 0.25) {
            p.vx += (Math.random() - 0.5) * 0.06;
            p.vy += (Math.random() - 0.5) * 0.06;
          }

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < cursorDist && d > 1) {
              const force = d < 65 ? -0.045 : 0.022;
              p.vx += (dx / d) * force;
              p.vy += (dy / d) * force;
            }
          }

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const aRgb = toneColors[a.tone].rgb;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${aRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.05;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const dx = pointer.x - a.x;
          const dy = pointer.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d < cursorDist) {
            const alpha = (1 - d / cursorDist) * 0.45;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(${aRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const palette = toneColors[p.tone];
        const pulse = 1 + Math.sin(p.phase) * 0.11;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = palette.membrane;
        ctx.fill();
        ctx.strokeStyle = palette.border;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.72, 0, Math.PI * 2);
        ctx.fillStyle = palette.core;
        ctx.fill();
      }
    };

    const renderLaminar = () => {
      const lineSpacing = 28;
      const stepX = 18;
      const rows = Math.ceil(height / lineSpacing) + 2;
      const rowPalette = [
        'rgba(2, 132, 199, 0.28)',
        'rgba(5, 150, 105, 0.26)',
        'rgba(124, 58, 237, 0.22)',
        'rgba(217, 119, 6, 0.22)',
      ];

      for (let r = 0; r < rows; r++) {
        const baseY = r * lineSpacing;
        const isAccent = r % 2 === 0;

        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += stepX) {
          let y = baseY + Math.sin(x * 0.008 + time * 1.1 + r * 0.45) * 6.5;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = baseY - pointer.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 190;
            if (dist < influenceRadius && dist > 1) {
              const strength = Math.pow(1 - dist / influenceRadius, 2);
              const sign = dy >= 0 ? 1 : -1;
              y += sign * strength * 48;
            }
          }

          for (const rip of ripples) {
            const dist = Math.hypot(x - rip.x, baseY - rip.y);
            const band = Math.abs(dist - rip.radius);
            if (band < 45) {
              y += Math.sin((1 - band / 45) * Math.PI) * rip.alpha * 24;
            }
          }

          if (x === -20) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = rowPalette[r % rowPalette.length];
        ctx.lineWidth = isAccent ? 1.65 : 1.1;
        ctx.stroke();
      }

      if (pointer.active) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2, 132, 199, 0.12)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.35)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
    };

    const renderDifusion = () => {
      const gapX = 36;
      const gapY = 30;
      const cols = Math.ceil(width / gapX) + 2;
      const rows = Math.ceil(height / gapY) + 2;
      const dotRgb = ['2, 132, 199', '5, 150, 105', '124, 58, 237', '217, 119, 6'];

      for (let row = 0; row < rows; row++) {
        const offsetX = row % 2 === 0 ? 0 : gapX * 0.5;
        for (let col = 0; col < cols; col++) {
          const baseX = col * gapX + offsetX;
          const baseY = row * gapY;

          const wave =
            Math.sin(baseX * 0.014 + time * 1.4) * 5 +
            Math.cos(baseY * 0.016 - time * 1.2) * 5;

          let px = baseX;
          let py = baseY + wave;
          let dotRadius = 2.2 + (Math.sin(baseX * 0.015 + baseY * 0.015 + time) + 1) * 0.7;
          let alpha = 0.28;

          if (pointer.active) {
            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < 180 && d > 0.5) {
              const factor = Math.pow(1 - d / 180, 1.8);
              px += (dx / d) * factor * 18;
              py += (dy / d) * factor * 18;
              dotRadius += factor * 2.5;
              alpha += factor * 0.45;
            }
          }

          for (const rip of ripples) {
            const d = Math.hypot(baseX - rip.x, baseY - rip.y);
            const diff = Math.abs(d - rip.radius);
            if (diff < 40) {
              const boost = (1 - diff / 40) * rip.alpha;
              dotRadius += boost * 4.5;
              alpha = Math.min(0.88, alpha + boost * 0.72);
            }
          }

          const rgb = dotRgb[(row + col) % dotRgb.length];
          ctx.beginPath();
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    const tick = () => {
      if (!prefersReducedMotion) {
        time += 0.016;
      }

      drawBackdrop();

      const activeMode = modeRef.current;
      if (activeMode === 'molecular') {
        renderMolecular();
      } else if (activeMode === 'laminar') {
        renderLaminar();
      } else {
        renderDifusion();
      }

      drawRipples();
      animationId = window.requestAnimationFrame(tick);
    };

    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
    />
  );
};
