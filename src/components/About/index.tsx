import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { config } from "../../data/config";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const row = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-light uppercase tracking-[0.2em] text-white/25">
      {children}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-20"
      >
        {/* Left column — sticky */}
        <div className="sm:sticky sm:top-24 sm:w-60 sm:flex-shrink-0">
          <SectionLabel>Parcours</SectionLabel>
          <h2 className="mt-2 text-3xl font-light tracking-heading text-gradient">
            Formation
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/35">
            Deux ans de BTS SIO puis un Bachelor Web pour maîtriser la conception
            d'applications fullstack modernes.
          </p>

          {/* Availability banner */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-2 text-xs font-light text-cyan-400/80">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
            </span>
            Disponible alternance 2024-2025 · MyDigitalSchool Caen
          </div>

          {/* CV download */}
          <a
            href="/CV_Valentin_Alcala_Developpeur_Web_Alternance.pdf"
            download
            className="glass-card mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-light text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white/90"
          >
            <Download size={13} className="opacity-60" />
            Télécharger CV
          </a>
        </div>

        {/* Right column — timeline */}
        <div className="flex-1">
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative space-y-10 border-l border-white/[0.07] pl-8"
          >
            {config.education.map((edu, i) => (
              <motion.li key={i} variants={row} className="relative">
                <span className="absolute -left-[calc(2rem+4px)] top-1.5 h-2 w-2 rounded-full border border-white/20 bg-white/10" />
                <p className="text-[11px] font-light uppercase tracking-[0.15em] text-white/25">
                  {edu.year}
                </p>
                <h3 className="mt-1.5 text-base font-normal text-white/75">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm font-light text-white/35">
                  {edu.school} — {edu.location}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Languages */}
          <div className="mt-14 border-t border-white/[0.06] pt-10">
            <SectionLabel>Langues</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {config.languages.map((lang) => (
                <div key={lang.name} className="glass-card rounded-xl px-4 py-2.5">
                  <p className="text-sm font-normal text-white/70">{lang.name}</p>
                  <p className="text-xs font-light text-white/30">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
