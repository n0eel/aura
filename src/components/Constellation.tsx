import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// A heart drawn from star points
const points = [
  [50, 30], [40, 22], [28, 22], [20, 32], [22, 46], [35, 60], [50, 75],
  [65, 60], [78, 46], [80, 32], [72, 22], [60, 22], [50, 30],
];

const edges: [number, number][] = points.slice(0, -1).map((_, i) => [i, i + 1]);

export function Constellation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25%", once: true });

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12">
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
            IV — Our Constellation
          </div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">
            A sky drawn for you
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Thirteen stars I named after the moments I love most.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-xl">
          {/* nebula glow */}
          <div
            className="absolute inset-0 -z-10 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.3 340 / 0.5), oklch(0.35 0.25 290 / 0.3) 40%, transparent 70%)",
            }}
          />
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            {/* Connecting lines */}
            {edges.map(([a, b], i) => {
              const p1 = points[a];
              const p2 = points[b];
              return (
                <motion.line
                  key={i}
                  x1={p1[0]}
                  y1={p1[1]}
                  x2={p2[0]}
                  y2={p2[1]}
                  stroke="url(#starGrad)"
                  strokeWidth={0.25}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
                  transition={{ duration: 1.5, delay: 1 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}

            <defs>
              <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.95 0.05 320)" />
                <stop offset="100%" stopColor="oklch(0.72 0.28 340)" />
              </linearGradient>
              <radialGradient id="starFill">
                <stop offset="0%" stopColor="oklch(1 0 0)" />
                <stop offset="60%" stopColor="oklch(0.85 0.18 340)" />
                <stop offset="100%" stopColor="oklch(0.55 0.25 305 / 0)" />
              </radialGradient>
            </defs>

            {/* Stars */}
            {points.slice(0, -1).map(([x, y], i) => (
              <motion.g
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${x}px ${y}px`, transformBox: "fill-box" }}
              >
                <circle cx={x} cy={y} r={2.5} fill="url(#starFill)" opacity={0.6} />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={0.9}
                  fill="oklch(1 0 0)"
                  animate={{ opacity: [0.6, 1, 0.6], r: [0.9, 1.3, 0.9] }}
                  transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
                />
              </motion.g>
            ))}
          </svg>

          {/* drifting particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-soft-glow"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 41) % 100}%`,
                boxShadow: "0 0 8px oklch(0.95 0.05 320)",
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mx-auto mt-12 max-w-md font-display text-xl italic text-muted-foreground"
        >
          ✦ Look up tonight — it's still drawing itself.
        </motion.p>
      </div>
    </section>
  );
}
