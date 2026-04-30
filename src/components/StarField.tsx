import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  hue: number;
  twinkle: number;
}

export function StarField({ density = 200, shooting = true }: { density?: number; shooting?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let stars: Star[] = [];
    let shootingStars: { x: number; y: number; vx: number; vy: number; life: number; max: number }[] = [];
    let mouseX = 0, mouseY = 0;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.6 + 0.3,
        hue: 280 + Math.random() * 80,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    };
    window.addEventListener("mousemove", onMove);

    let last = performance.now();
    let shootTimer = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        s.twinkle += dt * 2;
        const op = 0.4 + Math.sin(s.twinkle) * 0.4;
        const px = s.x + mouseX * s.z;
        const py = s.y + mouseY * s.z;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, s.r * 6 * s.z);
        grad.addColorStop(0, `oklch(0.95 0.1 ${s.hue} / ${op})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, s.r * 6 * s.z, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `oklch(0.98 0.05 ${s.hue} / ${op})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      if (shooting) {
        shootTimer += dt;
        if (shootTimer > 4 + Math.random() * 4) {
          shootTimer = 0;
          shootingStars.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.4,
            vx: -300 - Math.random() * 200,
            vy: 200 + Math.random() * 150,
            life: 0,
            max: 1.2,
          });
        }
        shootingStars = shootingStars.filter((sh) => {
          sh.life += dt;
          sh.x += sh.vx * dt;
          sh.y += sh.vy * dt;
          const t = sh.life / sh.max;
          if (t >= 1) return false;
          const op = Math.sin(t * Math.PI);
          const tailX = sh.x - sh.vx * 0.15;
          const tailY = sh.y - sh.vy * 0.15;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `oklch(0.95 0.2 340 / ${op})`);
          grad.addColorStop(1, "transparent");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          return true;
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, shooting]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
