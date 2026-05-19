import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          {/* src={heroImg} */}
          alt="Two souls beneath a violet sky"
          className="h-full w-full object-cover opacity-50"
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.05 0.01 280 / 0.4) 0%, oklch(0.05 0.01 280 / 0.6) 60%, var(--background) 100%)",
          }}
        />
      </motion.div>

      {/* Floating hearts/orbs */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            background: i % 3 === 0
              ? "oklch(0.75 0.3 345)"
              : "oklch(0.95 0.05 320)",
            boxShadow: "0 0 20px currentColor",
            color: i % 3 === 0 ? "oklch(0.75 0.3 345)" : "oklch(0.95 0.05 320)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary md:text-xs"
        >
          Chapter One — A Love Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-glow-soft md:text-7xl lg:text-[8rem]"
        >
          <span className="gradient-text italic">In every universe,</span>
          <br />
          <span className="text-foreground">I'd find you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          A love letter written in starlight — every memory, every moment, every quiet
          evening folded into something we'll carry forever.
        </motion.p>

        <motion.a
          href="#timeline"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/40 bg-background/30 px-8 py-4 backdrop-blur-xl animate-pulse-glow"
        >
          <span className="relative z-10 font-display text-base italic tracking-wide">
            Our Story
          </span>
          <span
            className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden
          >
            ↓
          </span>
          <span
            className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "var(--gradient-neon)" }}
          />
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
      </motion.div>
    </section>
  );
}
