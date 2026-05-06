import { motion } from "framer-motion";
import { config } from "../../data/config";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function Hero() {
  const { name, email } = config.identity;

  return (
    <section
      id="hero"
      className="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-32 sm:py-40"
    >
      {/* Status pill */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ececec] bg-white px-3.5 py-1 text-xs font-medium text-[#555] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Disponible — Alternance Septembre 2025
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        {...fadeUp(0.08)}
        className="text-5xl font-bold tracking-display text-[#111] sm:text-7xl"
      >
        {name}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        {...fadeUp(0.16)}
        className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-[#555]"
      >
        Développeur Fullstack · Symfony, Spring Boot, React.{" "}
        <span className="text-[#111] font-medium">
          Futur Bachelor Web à MyDigitalSchool Caen.
        </span>
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.24)}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href={`mailto:${email}`}
          className="rounded-full bg-[#111] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-80"
        >
          Me contacter
        </a>
        <a
          href="#projects"
          className="rounded-full border border-[#ececec] bg-white px-6 py-2.5 text-sm font-semibold text-[#111] shadow-sm transition-shadow hover:shadow-md"
        >
          Voir mes projets
        </a>
        <a
          href={config.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#888] underline-offset-4 transition-colors hover:text-[#111] hover:underline"
        >
          GitHub →
        </a>
      </motion.div>
    </section>
  );
}
