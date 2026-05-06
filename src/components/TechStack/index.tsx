import { motion } from "framer-motion";
import { config } from "../../data/config";

interface TechMeta {
  color: string;
  bg: string;
  border: string;
}

const TECH_META: Record<string, TechMeta> = {
  "PHP":         { color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe" },
  "Symfony":     { color: "#1b1b1b", bg: "#f5f5f5", border: "#e5e5e5" },
  "Java":        { color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  "Spring Boot": { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  "Kotlin":      { color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff" },
  "JavaScript":  { color: "#a16207", bg: "#fefce8", border: "#fef08a" },
  "TypeScript":  { color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  "React":       { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  "HTML / CSS":  { color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
  "SQL":         { color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
};

const NEUTRAL: TechMeta = { color: "#555", bg: "#fafafa", border: "#ececec" };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#aaa]">
          Technologies
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-heading text-[#111]">
          Stack
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {config.technologies.map((tech) => {
          const meta = TECH_META[tech] ?? NEUTRAL;
          return (
            <motion.span
              key={tech}
              variants={item}
              initial={{ color: "#888", backgroundColor: "#fafafa", borderColor: "#ececec" }}
              whileHover={{
                color: meta.color,
                backgroundColor: meta.bg,
                borderColor: meta.border,
                scale: 1.04,
                transition: { duration: 0.18 },
              }}
              style={{ border: "1px solid #ececec" }}
              className="inline-flex cursor-default items-center rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {tech}
            </motion.span>
          );
        })}
      </motion.div>
    </section>
  );
}
