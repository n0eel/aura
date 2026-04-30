import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Forever() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden px-6 py-32 md:px-12">
      {/* Falling stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-soft-glow"
            style={{
              left: `${(i * 17) % 100}%`,
              top: "-10%",
              boxShadow: "0 0 10px oklch(0.95 0.05 320), 0 0 30px oklch(0.72 0.28 340 / 0.6)",
            }}
            animate={{
              y: ["0vh", "120vh"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, scale }}
        className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary"
        >
          VII — The End is Just a Door
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 font-display text-5xl italic leading-[1] md:text-8xl lg:text-[10rem]"
        >
          <span className="gradient-text">If the stars went out</span>
          <br />
          <span className="text-foreground text-glow-soft">I'd still find you.</span>
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="hover"
          className="group relative mt-16 overflow-hidden rounded-full px-14 py-7 animate-pulse-glow"
          style={{
            background: "var(--gradient-neon)",
            boxShadow: "0 0 60px oklch(0.72 0.28 340 / 0.6), 0 0 120px oklch(0.55 0.25 305 / 0.4)",
          }}
        >
          <span className="relative z-10 font-display text-3xl italic tracking-wider text-foreground md:text-5xl">
            Forever
          </span>
          <span className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.2 }}
          className="mt-16 max-w-md text-balance font-display text-lg italic text-muted-foreground"
        >
          — Yours, in every timeline.
        </motion.p>

        <div className="mt-24 font-mono text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50">
          made with light · 2026
        </div>
      </motion.div>
    </section>
  );
}
