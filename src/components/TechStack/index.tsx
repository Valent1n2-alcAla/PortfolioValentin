import { motion } from "framer-motion";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

interface TechMeta { color: string; bg: string; border: string }

const TECH_META: Record<string, TechMeta> = {
  "PHP":         { color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe" },
  "Symfony":     { color: "#1e293b", bg: "#f8fafc", border: "#e2e8f0" },
  "Java":        { color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  "Spring Boot": { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  "Kotlin":      { color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff" },
  "JavaScript":  { color: "#a16207", bg: "#fefce8", border: "#fef08a" },
  "TypeScript":  { color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  "React":       { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  "HTML / CSS":  { color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
  "SQL":         { color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
};

const NEUTRAL: TechMeta = { color: "#475569", bg: "#f8fafc", border: "#e2e8f0" };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const item = {
  hidden:  { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease } },
};

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
          Technologies
        </p>
        <TextReveal
          as="h2"
          className="font-display mt-2 block text-3xl font-medium tracking-display text-[#1e293b]"
        >
          Stack
        </TextReveal>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap gap-3"
      >
        {config.technologies.map((tech) => {
          const meta = TECH_META[tech] ?? NEUTRAL;
          return (
            <motion.span
              key={tech}
              variants={item}
              whileHover={{
                color: meta.color,
                backgroundColor: meta.bg,
                borderColor: meta.border,
                scale: 1.05,
                transition: { duration: 0.18 },
              }}
              style={{
                color: "#64748b",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
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
