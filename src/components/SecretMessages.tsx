import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  { lock: "01 · ENCRYPTED", text: "I love the way you laugh in the middle of sentences. You don't even know you do it." },
  { lock: "02 · ENCRYPTED", text: "Every song on the radio is about you now. I don't think the radio knows. I haven't told it." },
  { lock: "03 · ENCRYPTED", text: "If the universe is infinite, then somewhere out there we're meeting again, for the first time, forever." },
  { lock: "04 · ENCRYPTED", text: "I would build cathedrals out of ordinary mornings, just to spend them with you." },
];

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p className="font-display text-2xl italic leading-relaxed text-foreground md:text-3xl">
      {shown}
      <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-primary align-middle" />
    </p>
  );
}

export function SecretMessages() {
  const [open, setOpen] = useState<number | null>(null);

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
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">VI — Whispers</div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-7xl">Secret Notes</h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            For your eyes only. Tap to decrypt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {messages.map((m, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              data-cursor="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-2xl p-8 text-left transition-all hover:border-primary/40"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.72 0.28 340 / 0.2), transparent 70%)" }} />
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/80">{m.lock}</div>
              <div className="mt-6 font-display text-2xl italic text-muted-foreground">
                ✦ ✦ ✦ ✦ ✦ ✦ ✦
              </div>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                tap to reveal →
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-6 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative max-w-2xl rounded-3xl p-10 md:p-16"
              style={{ boxShadow: "0 0 80px oklch(0.72 0.28 340 / 0.3)" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
                {messages[open].lock} · DECRYPTED
              </div>
              <div className="mt-8">
                <Typewriter text={messages[open].text} />
              </div>
              <button
                onClick={() => setOpen(null)}
                className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground"
              >
                ← seal the envelope
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
