import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const START = new Date("2022-03-14T00:00:00");

function diff(now: Date) {
  const ms = now.getTime() - START.getTime();
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl tabular-nums text-glow gradient-text md:text-8xl lg:text-[10rem]"
        >
          {value.toString().padStart(2, "0")}
        </motion.div>
      </div>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.5em] text-muted-foreground md:text-xs">
        {label}
      </div>
    </div>
  );
}

export function LoveCounter() {
  const [t, setT] = useState(() => diff(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(diff(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">V — Eternity</div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">
            Days Together
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong mt-16 grid grid-cols-2 gap-6 rounded-3xl p-10 md:grid-cols-4 md:p-16"
          style={{ boxShadow: "var(--shadow-cinematic)" }}
        >
          <Cell value={t.days} label="days" />
          <Cell value={t.hours} label="hours" />
          <Cell value={t.minutes} label="minutes" />
          <Cell value={t.seconds} label="seconds" />
        </motion.div>

        <p className="mx-auto mt-10 max-w-md text-sm italic text-muted-foreground">
          and counting, infinitely.
        </p>
      </div>
    </section>
  );
}
