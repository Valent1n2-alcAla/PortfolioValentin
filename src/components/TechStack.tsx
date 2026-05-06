import { motion } from "framer-motion";
import { config } from "../data/config";

const TECH_COLORS: Record<string, string> = {
  "PHP":         "border-violet-500/40 bg-violet-500/10 text-violet-300",
  "Symfony":     "border-violet-500/40 bg-violet-500/10 text-violet-300",
  "Java":        "border-orange-500/40 bg-orange-500/10 text-orange-300",
  "Spring Boot": "border-green-500/40  bg-green-500/10  text-green-300",
  "Kotlin":      "border-purple-500/40 bg-purple-500/10 text-purple-300",
  "JavaScript":  "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  "TypeScript":  "border-blue-500/40   bg-blue-500/10   text-blue-300",
  "React":       "border-cyan-500/40   bg-cyan-500/10   text-cyan-300",
  "HTML / CSS":  "border-red-500/40    bg-red-500/10    text-red-300",
  "SQL":         "border-slate-500/40  bg-slate-500/10  text-slate-300",
};

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white">Stack Technique</h2>
        <p className="mt-2 text-sm text-slate-500">Technologies maîtrisées</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {config.technologies.map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:scale-105 ${
              TECH_COLORS[tech] ?? "border-slate-700 bg-slate-800 text-slate-300"
            }`}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
