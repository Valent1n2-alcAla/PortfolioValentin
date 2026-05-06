import { motion } from "framer-motion";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { name, email } = config.identity;

  const magContact = useMagnetic<HTMLAnchorElement>(0.3);
  const magProjects = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section
      id="hero"
      className="flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-light text-white/60 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Disponible pour alternance — MyDigitalSchool Caen
        </span>
      </motion.div>

      {/* Name — text reveal */}
      <TextReveal
        as="h1"
        className="text-gradient block text-5xl font-light tracking-display sm:text-7xl lg:text-8xl"
        delay={0.05}
      >
        {name}
      </TextReveal>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
        className="mt-5 text-xl font-light text-white/35 tracking-wide"
      >
        Développeur Fullstack
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="mt-4 max-w-lg text-sm font-light leading-relaxed text-white/30"
      >
        Symfony · Spring Boot · React · Kotlin
      </motion.p>

      {/* CTAs — magnetic */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.a
          ref={magContact.ref}
          href={`mailto:${email}`}
          animate={{ x: magContact.offset.x, y: magContact.offset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
          onMouseMove={magContact.onMouseMove}
          onMouseLeave={magContact.onMouseLeave}
          className="rounded-full border border-white/15 bg-white/[0.06] px-7 py-2.5 text-sm font-light text-white/80 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
        >
          Me contacter
        </motion.a>

        <motion.a
          ref={magProjects.ref}
          href="#projects"
          animate={{ x: magProjects.offset.x, y: magProjects.offset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
          onMouseMove={magProjects.onMouseMove}
          onMouseLeave={magProjects.onMouseLeave}
          className="rounded-full px-7 py-2.5 text-sm font-light text-white/35 transition-colors hover:text-white/70"
        >
          Voir mes projets →
        </motion.a>
      </motion.div>
    </section>
  );
}
