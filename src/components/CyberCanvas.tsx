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

    interface LatticeVertex {
      x: number;
      y: number;
      z: number;
      gx: number;
      gz: number;
    }

    const cols = 12;
    const rows = 10;
    const spacing = 160;
    const vertices: LatticeVertex[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        vertices.push({
          x: (c - (cols - 1) / 2) * spacing,
          y: 0,
          z: (r - (rows - 1) / 2) * spacing + 420,
          gx: c,
          gz: r,
        });
      }
    }

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
    const fov = 720;

    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5 + mouseX * 28;
      const cy = height * 0.54 + mouseY * 18;
      const rotY = mouseX * 0.14 + Math.sin(t * 0.35) * 0.08;
      const rotX = 0.42 + mouseY * 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: { sx: number; sy: number; z: number }[] = [];

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const wave =
          Math.sin(v.gx * 0.55 + t + scrollY * 0.002) * 32 +
          Math.cos(v.gz * 0.55 - t * 0.8) * 24;

        const wx = v.x;
        const wy = wave + 190;
        const wz = v.z;

        // Rotate around Y then X
        const rx = wx * cosY - wz * sinY;
        const rz1 = wx * sinY + wz * cosY;
        const ry = wy * cosX - rz1 * sinX;
        const rz = wy * sinX + rz1 * cosX + 680;

        const scale = fov / Math.max(120, rz);
        projected.push({
          sx: cx + rx * scale,
          sy: cy + ry * scale,
          z: rz,
        });
      }

      // Draw crisp architectural wireframe mesh
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = "#CDC9BE";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = projected[idx];
          if (c + 1 < cols) {
            const right = projected[idx + 1];
            ctx.beginPath();
            ctx.moveTo(p.sx, p.sy);
            ctx.lineTo(right.sx, right.sy);
            ctx.stroke();
          }
          if (r + 1 < rows) {
            const down = projected[idx + cols];
            ctx.beginPath();
            ctx.moveTo(p.sx, p.sy);
            ctx.lineTo(down.sx, down.sy);
            ctx.stroke();
          }
        }
      }

      // Draw precision node markers at lattice intersections
      ctx.fillStyle = "#0F4C81";
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillRect(p.sx - 1.5, p.sy - 1.5, 3, 3);
      }

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
