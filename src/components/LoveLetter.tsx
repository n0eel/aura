import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "If I could choose any soul,",
  "in any century, in any sky —",
  "I would always, always",
  "choose yours.",
  "",
  "You are my favorite accident,",
  "my softest miracle,",
  "the only ending I want",
  "for every story I tell.",
];

export function LoveLetter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 4]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="mb-16 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
            VI½ — The Letter
          </div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">
            Read me slowly
          </h2>
        </motion.div>

        <motion.div
          style={{ rotate, y }}
          className="relative mx-auto max-w-2xl"
        >
          {/* paper */}
          <div
            className="relative rounded-sm p-10 md:p-16"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.96 0.02 90) 0%, oklch(0.92 0.04 60) 100%)",
              boxShadow:
                "0 40px 80px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(1 0 0 / 0.05), inset 0 0 60px oklch(0.6 0.12 40 / 0.15)",
            }}
          >
            {/* wax seal */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.55 0.3 25), oklch(0.35 0.25 15))",
                boxShadow:
                  "0 10px 30px oklch(0.3 0.2 15 / 0.6), inset 0 -4px 8px oklch(0 0 0 / 0.3)",
              }}
            >
              <span className="font-display text-3xl italic text-soft-glow">L</span>
            </motion.div>

            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-background/60">
              To my forever,
            </div>

            <div className="mt-8 space-y-2 font-display text-2xl italic leading-relaxed text-background md:text-3xl">
              {lines.map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-4" />
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="mt-10 text-right font-display text-xl italic text-background/80"
            >
              — eternally, me ♡
            </motion.div>
          </div>

          {/* floating petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute h-3 w-3 rounded-full"
              style={{
                left: `${(i * 37) % 90 + 5}%`,
                top: `${(i * 53) % 80 + 10}%`,
                background: "oklch(0.8 0.18 350)",
                boxShadow: "0 0 12px oklch(0.75 0.3 345)",
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, 15, 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
