import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 600);
      }
      setProgress(Math.min(100, p));
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-aurora)" }}
          />
          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl tracking-[0.3em] text-glow gradient-text md:text-7xl"
            >
              LUMIÈRE
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
            >
              a love letter from the future
            </motion.div>
            <div className="relative h-px w-64 overflow-hidden bg-border/50">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${progress}%`,
                  background: "var(--gradient-neon)",
                  boxShadow: "0 0 20px oklch(0.72 0.28 340 / 0.8)",
                }}
              />
            </div>
            <div className="font-mono text-xs tabular-nums text-muted-foreground">
              {progress.toFixed(0).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
