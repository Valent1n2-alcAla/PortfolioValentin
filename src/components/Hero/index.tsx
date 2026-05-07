import { motion } from "framer-motion";
import { config } from "../../data/config";
import { useMagnetic } from "../../hooks/useMagnetic";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

export default function Hero() {
  const { name, email } = config.identity;
  const magContact  = useMagnetic<HTMLAnchorElement>(0.28);
  const magProjects = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section
      id="hero"
      className="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-32 sm:py-44"
    >
      {/* Availability badge */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1 text-xs font-medium text-green-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
          </span>
          Disponible pour alternance — Septembre 2025
        </span>
      </motion.div>

      {/* Title — Playfair Display serif */}
      <motion.h1
        {...fadeUp(0.08)}
        className="font-display text-5xl font-medium tracking-display text-[#1e293b] sm:text-7xl lg:text-8xl"
      >
        {name}
      </motion.h1>

      {/* Role */}
      <motion.p
        {...fadeUp(0.18)}
        className="mt-5 text-xl font-light text-[#64748b]"
      >
        Développeur Web Fullstack
      </motion.p>

      {/* Human tagline */}
      <motion.p
        {...fadeUp(0.26)}
        className="mt-4 max-w-xl text-base font-light leading-relaxed text-[#94a3b8]"
      >
        Passionné par l'architecture logicielle et les interfaces durables.{" "}
        <span className="text-[#64748b]">
          Futur Bachelor Web à MyDigitalSchool Caen.
        </span>
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.36)} className="mt-10 flex flex-wrap items-center gap-4">
        <motion.a
          ref={magContact.ref}
          href={`mailto:${email}`}
          animate={{ x: magContact.offset.x, y: magContact.offset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
          onMouseMove={magContact.onMouseMove}
          onMouseLeave={magContact.onMouseLeave}
          className="rounded-full bg-[#1e293b] px-7 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f172a]"
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
          className="rounded-full border border-[#e2e8f0] px-7 py-2.5 text-sm font-medium text-[#64748b] transition-all hover:border-[#cbd5e1] hover:text-[#1e293b]"
        >
          Voir mes projets →
        </motion.a>
      </motion.div>
    </section>
  );
}
