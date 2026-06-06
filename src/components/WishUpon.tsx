import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const wishes = [
  "I wish for every Sunday morning to feel like yours.",
  "I wish your dreams arrive softer than mine.",
  "I wish for one more chapter, then another, then forever.",
  "I wish the sky always gives you the moon you need.",
  "I wish your hands always find mine in the dark.",
  "I wish you knew how loved you are. Right now. Always.",
];

export function WishUpon() {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
            VI¾ — Make a Wish
          </div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">
            Catch a star
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Tap any falling star. It already knows what to whisper.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-20 h-[520px] w-full max-w-3xl">
          {/* horizon glow */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at bottom, oklch(0.4 0.25 320 / 0.5), transparent 70%)",
            }}
          />

          {wishes.map((w, i) => {
            const left = (i * 17 + 8) % 90;
            const delay = i * 1.2;
            return (
              <motion.button
                key={i}
                data-cursor="hover"
                onClick={() => setPicked(i)}
                className="absolute -top-10"
                style={{ left: `${left}%` }}
                animate={{
                  y: [0, 560],
                  opacity: [0, 1, 1, 0.6, 0],
                  x: [0, 30, -10, 40, 0],
                }}
                transition={{
                  duration: 8 + (i % 3),
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                  times: [0, 0.1, 0.5, 0.8, 1],
                }}
                whileHover={{ scale: 1.6 }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "oklch(1 0 0)",
                    boxShadow:
                      "0 0 14px oklch(0.95 0.05 320), 0 0 30px oklch(0.72 0.28 340 / 0.8), 0 0 60px oklch(0.55 0.25 305 / 0.5)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 -translate-y-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, oklch(0.95 0.05 320 / 0.6))",
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPicked(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-6 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: "blur(30px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative max-w-xl rounded-3xl p-12 text-center md:p-16"
              style={{ boxShadow: "0 0 100px oklch(0.72 0.28 340 / 0.4)" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
                ✦ Wish Granted
              </div>
              <p className="mt-8 font-display text-3xl italic leading-relaxed text-foreground md:text-4xl">
                {wishes[picked]}
              </p>
              <button
                onClick={() => setPicked(null)}
                className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground"
              >
                ← release it back to the sky
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
