import { useEffect, useRef } from "react";

export function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    interface Star {
      x: number;
      y: number;
      z: number;
      color: string;
    }

    const palette = ["#8b72ff", "#38b29a", "#f2789f", "#569cd6", "#f5a623", "#b388eb"];
    const stars: Star[] = Array.from({ length: 110 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1600,
      z: Math.random() * 1400 + 100,
      color: palette[i % palette.length],
    }));

    let scrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseX * 45;
      const cy = height / 2 + mouseY * 35;
      const speed = 2.2 + (scrollY % 600) * 0.008;

      const projected: { sx: number; sy: number; r: number; color: string; z: number }[] = [];

      for (const s of stars) {
        s.z -= speed;
        if (s.z <= 20) {
          s.z = 1400;
          s.x = (Math.random() - 0.5) * 1600;
          s.y = (Math.random() - 0.5) * 1600;
        }
        const scale = 520 / s.z;
        const sx = cx + s.x * scale + Math.sin(t + s.z * 0.01) * 8;
        const sy = cy + (s.y - scrollY * 0.35) * scale;
        const r = Math.max(0.8, Math.min(4.2, (1400 - s.z) / 360));

        if (sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50) {
          projected.push({ sx, sy, r, color: s.color, z: s.z });
          ctx.beginPath();
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.min(0.85, (1400 - s.z) / 1000);
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw neural constellation threads between nearby 3D nodes
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = dx * dx + dy * dy;
          if (dist < 13500) {
            ctx.globalAlpha = (1 - dist / 13500) * 0.22;
            ctx.strokeStyle = a.color;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-canvas" aria-hidden="true" />;
}
