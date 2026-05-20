import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import track from "@/assets/by the sea.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [bars, setBars] = useState<number[]>(Array(48).fill(0.2));

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (playing) {
        setBars((b) => b.map(() => 0.15 + Math.random() * 0.85));
      } else {
        setBars((b) => b.map((v) => Math.max(0.1, v * 0.92)));
      }
      raf = requestAnimationFrame(tick);
    };
    const id = setInterval(tick, 90);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [playing]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };

  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="mb-16 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">IV — Sound</div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">Our Song</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{ boxShadow: "var(--shadow-cinematic)" }}
        >
          <div className="absolute inset-0 -z-10 opacity-50"
            style={{ background: "radial-gradient(ellipse at top right, oklch(0.55 0.25 305 / 0.4), transparent 60%)" }} />

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr]">
            {/* Vinyl */}
            <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(0.15 0.04 285) 0%, oklch(0.05 0 0) 60%, oklch(0.1 0.03 285) 100%)",
                  boxShadow:
                    "0 0 60px oklch(0.72 0.28 340 / 0.4), inset 0 0 40px oklch(0 0 0 / 0.8)",
                }}
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 6, ease: "linear", repeat: playing ? Infinity : 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute inset-0 rounded-full border border-foreground/5"
                    style={{ transform: `scale(${1 - i * 0.08})` }} />
                ))}
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "var(--gradient-neon)", boxShadow: "0 0 30px oklch(0.72 0.28 340 / 0.7)" }}>
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">now playing</div>
                <div className="mt-2 font-display text-3xl italic md:text-4xl">Eternity and A day</div>
                <div className="text-sm text-muted-foreground">By the sea · 3:14</div>
              </div>

              {/* Waveform */}
              <div className="flex h-16 items-center gap-[3px]">
                {bars.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-150"
                    style={{
                      height: `${v * 100}%`,
                      background: `linear-gradient(180deg, oklch(0.75 0.3 345), oklch(0.45 0.22 295))`,
                      opacity: 0.4 + v * 0.6,
                      boxShadow: playing ? "0 0 8px oklch(0.72 0.28 340 / 0.6)" : "none",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggle}
                  data-cursor="hover"
                  className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 glass-strong transition-transform hover:scale-110 active:scale-95"
                  style={{ boxShadow: "0 0 30px oklch(0.72 0.28 340 / 0.4)" }}
                >
                  {playing ? (
                    <span className="flex gap-1">
                      <span className="h-4 w-1 bg-foreground" />
                      <span className="h-4 w-1 bg-foreground" />
                    </span>
                  ) : (
                    <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-foreground" />
                  )}
                </button>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {playing ? "playing" : "press to drift away"}
                </div>
              </div>

              {/* Generated tone (no external file needed) */}
              <audio ref={audioRef} loop>
                <source
                  src={track}
                  type="audio/wav"
                />
              </audio>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
