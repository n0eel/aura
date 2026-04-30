import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 50 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 50 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    document.documentElement.classList.add("cursor-none-all");
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [x, y]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full mix-blend-screen"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, oklch(0.75 0.3 345 / 0.6), oklch(0.55 0.25 305 / 0.2) 60%, transparent 70%)",
          scale: hovering ? 2.2 : 1,
          transition: "scale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-soft-glow"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 12px oklch(0.95 0.05 320 / 0.9)",
        }}
      />
    </>
  );
}
