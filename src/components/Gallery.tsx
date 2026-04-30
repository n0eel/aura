import { motion } from "framer-motion";
import mem1 from "@/assets/memory-1.jpg";
import mem2 from "@/assets/memory-2.jpg";
import mem3 from "@/assets/memory-3.jpg";
import mem4 from "@/assets/memory-4.jpg";
import mem5 from "@/assets/memory-5.jpg";
import mem6 from "@/assets/memory-6.jpg";

const photos = [
  { src: mem1, caption: "first night out", rot: -6, x: -40, y: 0 },
  { src: mem3, caption: "sunday morning", rot: 5, x: 30, y: 40 },
  { src: mem2, caption: "rain & neon", rot: -3, x: 60, y: -30 },
  { src: mem5, caption: "midnight drive", rot: 8, x: -50, y: 50 },
  { src: mem4, caption: "december, ours", rot: -7, x: 20, y: -20 },
  { src: mem6, caption: "the question", rot: 4, x: -30, y: 30 },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="mb-20 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">III — Scrapbook</div>
          <h2 className="mt-6 font-display text-5xl italic gradient-text md:text-8xl">Polaroids</h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Drag them. Hold them. They're yours.
          </p>
        </motion.div>

        <div className="relative mx-auto grid min-h-[700px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              drag
              dragMomentum={false}
              dragElastic={0.2}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.4 } }}
              whileDrag={{ scale: 1.08, zIndex: 100, rotate: 0 }}
              initial={{ opacity: 0, y: 60, rotate: p.rot * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rot, x: p.x * 0.3, transition: { duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true }}
              data-cursor="hover"
              className="relative cursor-grab touch-none rounded-sm bg-soft-glow/95 p-3 pb-12 active:cursor-grabbing"
              style={{
                boxShadow: "0 25px 60px -15px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(1 0 0 / 0.05)",
              }}
            >
              <div className="relative overflow-hidden bg-background" style={{ aspectRatio: "4 / 5" }}>
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
                <div className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, transparent 50%, oklch(0 0 0 / 0.3))" }} />
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center font-display text-base italic text-background/80">
                {p.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
