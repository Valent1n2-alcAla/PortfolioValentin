import { motion } from "framer-motion";
import { config } from "../../data/config";

const ease = [0.16, 1, 0.3, 1] as const;

interface TechColor {
  color: string;
  bg: string;
  border: string;
}

const TECH_COLOR: Record<string, TechColor> = {
  "PHP":         { color: "#a78bfa", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.2)"  },
  "Symfony":     { color: "#e2e8f0", bg: "rgba(226,232,240,0.06)", border: "rgba(226,232,240,0.15)" },
  "Java":        { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)"  },
  "Spring Boot": { color: "#4ade80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.18)" },
  "Kotlin":      { color: "#c084fc", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.2)" },
  "JavaScript":  { color: "#fbbf24", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.18)" },
  "TypeScript":  { color: "#60a5fa", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.18)" },
  "React":       { color: "#22d3ee", bg: "rgba(34,211,238,0.07)",  border: "rgba(34,211,238,0.18)" },
  "HTML / CSS":  { color: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.18)" },
  "SQL":         { color: "#94a3b8", bg: "rgba(148,163,184,0.07)", border: "rgba(148,163,184,0.15)" },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mb-10"
      >
        <p className="text-xs font-light uppercase tracking-[0.2em] text-white/25">
          Technologies
        </p>
        <h2 className="mt-2 text-3xl font-light tracking-heading text-gradient">
          Stack
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {config.technologies.map((tech) => {
          const col = TECH_COLOR[tech] ?? {
            color: "rgba(255,255,255,0.5)",
            bg: "rgba(255,255,255,0.03)",
            border: "rgba(255,255,255,0.08)",
          };

          return (
            <motion.span
              key={tech}
              variants={item}
              whileHover={{
                color: col.color,
                backgroundColor: col.bg,
                borderColor: col.border,
                scale: 1.05,
                transition: { duration: 0.25 },
              }}
              style={{
                color: "rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              className="inline-flex cursor-default items-center rounded-full px-4 py-1.5 text-sm font-light backdrop-blur-sm"
            >
              {tech}
            </motion.span>
          );
        })}
      </motion.div>
    </section>
  );
}
