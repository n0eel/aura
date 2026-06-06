import { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

export function HeartTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 35) return;
      lastSpawn.current = now;
      heartsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.4 - Math.random() * 0.6,
        life: 1,
        size: 6 + Math.random() * 8,
        hue: 320 + Math.random() * 30,
      });
      if (heartsRef.current.length > 60) heartsRef.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const drawHeart = (x: number, y: number, s: number, alpha: number, hue: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 20, s / 20);
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.bezierCurveTo(-10, -18, -22, -6, 0, 12);
      ctx.bezierCurveTo(22, -6, 10, -18, 0, -5);
      ctx.closePath();
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha})`;
      ctx.fillStyle = `hsla(${hue}, 100%, 75%, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current = heartsRef.current.filter((h) => {
        h.x += h.vx;
        h.y += h.vy;
        h.vy -= 0.015;
        h.life -= 0.012;
        if (h.life <= 0) return false;
        drawHeart(h.x, h.y, h.size, h.life, h.hue);
        return true;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      aria-hidden
    />
  );
}
