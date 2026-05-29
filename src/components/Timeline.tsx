import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import mem1 from "@/assets/memory-1.jpg";
import mem2 from "@/assets/memory-2.jpg";
import mem4 from "@/assets/memory-4.jpg";
import mem6 from "@/assets/memory-6.jpg";

const events = [
  { date: "X, 2026", title: "First Glance", text: "A crowded café, a borrowed pen, a smile that rearranged the room.", img: mem1 },
  // { date: "X, 2026", title: "First Kiss", text: "Rain on neon glass. The city held its breath, and so did we.", img: mem2 },
  { date: "X, 2026", title: "Slow Dance", text: "Fairy lights, no music — just the rhythm of being known.", img: mem4 },
  { date: "X, 2026", title: "Forever", text: "Beneath a violet sky, a question, a yes, an entire universe.", img: mem6 },
];

function Item({ ev, i }: { ev: typeof events[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });
  const left = i % 2 === 0;
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="relative grid grid-cols-1 gap-8 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, x: left ? -60 : 60, filter: "blur(20px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0.3, filter: "blur(8px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`${left ? "md:order-1" : "md:order-2"} flex flex-col justify-center`}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
          {ev.date}
        </div>
        <h3 className="mt-4 font-display text-4xl italic gradient-text md:text-6xl">
          {ev.title}
        </h3>
        <p className="mt-6 max-w-md text-balance leading-relaxed text-muted-foreground">
          {ev.text}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0.3, filter: "blur(8px)" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className={`${left ? "md:order-2" : "md:order-1"} relative`}
      >
        <button
          onClick={() => setOpen(true)}
          data-cursor="hover"
          className="group relative block w-full overflow-hidden rounded-2xl glass-strong"
          style={{ aspectRatio: "4 / 5", boxShadow: "var(--shadow-cinematic)" }}
        >
          <img
            src={ev.img}
            alt={ev.title}
            loading="lazy"
            width={768}
            height={960}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-30"
            style={{ background: "linear-gradient(180deg, transparent 30%, oklch(0.05 0.01 280 / 0.8))" }} />
          <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-soft-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            ↗ open memory
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6 backdrop-blur-2xl"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0, filter: "blur(30px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={ev.img}
              alt={ev.title}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
              style={{ boxShadow: "0 0 80px oklch(0.72 0.28 340 / 0.3)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="mb-24 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">II — Memory</div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-8xl">A Timeline of Us</h2>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{ background: "linear-gradient(180deg, transparent, oklch(0.72 0.28 340 / 0.4), oklch(0.55 0.25 305 / 0.3), transparent)" }} />
          {events.map((ev, i) => (
            <Item key={ev.title} ev={ev} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
