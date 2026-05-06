import { motion } from "framer-motion";
import { config } from "../data/config";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function Hero() {
  const { name, email } = config.identity;
  const currentEdu = config.education[1];

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        {...fadeUp(0)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Disponible pour alternance — Septembre 2025
      </motion.div>

      <motion.h1
        {...fadeUp(0.1)}
        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
      >
        {name}
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="mt-4 text-xl font-medium text-indigo-400"
      >
        Développeur Fullstack
      </motion.p>

      <motion.p
        {...fadeUp(0.3)}
        className="mt-3 max-w-xl text-base text-slate-400"
      >
        Futur étudiant à{" "}
        <span className="text-slate-200">{currentEdu.school}</span> | Expert
        Symfony &amp; Spring Boot
      </motion.p>

      <motion.div
        {...fadeUp(0.4)}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
        >
          Voir mes projets
        </a>
        <a
          href={`mailto:${email}`}
          className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-indigo-500/60 hover:text-white"
        >
          Me contacter
        </a>
      </motion.div>
    </section>
  );
}
