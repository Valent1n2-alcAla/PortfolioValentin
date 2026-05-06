import { motion } from "framer-motion";
import { config } from "../../data/config";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  };
}

export default function Hero() {
  const { name, email } = config.identity;

  return (
    <section
      id="hero"
      className="flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Badge */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-light text-white/60 backdrop-blur-sm">
          {/* Pulsing green dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Disponible pour alternance — MyDigitalSchool Caen
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        {...fadeUp(0.1)}
        className="text-gradient text-5xl font-light tracking-display sm:text-7xl lg:text-8xl"
      >
        {name}
      </motion.h1>

      {/* Role */}
      <motion.p
        {...fadeUp(0.2)}
        className="mt-5 text-xl font-light text-white/35 tracking-wide"
      >
        Développeur Fullstack
      </motion.p>

      {/* Tagline */}
      <motion.p
        {...fadeUp(0.3)}
        className="mt-4 max-w-lg text-sm font-light leading-relaxed text-white/35"
      >
        Symfony · Spring Boot · React · Kotlin — Futur Bachelor Web à MyDigitalSchool Caen.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.4)}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href={`mailto:${email}`}
          className="rounded-full border border-white/15 bg-white/[0.06] px-7 py-2.5 text-sm font-light text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.10] hover:text-white"
        >
          Me contacter
        </a>
        <a
          href="#projects"
          className="rounded-full px-7 py-2.5 text-sm font-light text-white/35 transition-colors duration-300 hover:text-white/70"
        >
          Voir mes projets →
        </a>
      </motion.div>
    </section>
  );
}
