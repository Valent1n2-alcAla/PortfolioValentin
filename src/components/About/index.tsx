import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, GraduationCap, Languages } from "lucide-react";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

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

/* CV mini preview — expands on hover */
function CVPreview() {
  const [open, setOpen] = useState(false);
  const { ref, offset, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className="mt-7"
    >
      <motion.div
        animate={{ height: open ? 220 : 52 }}
        transition={{ duration: 0.45, ease }}
        className="glass-card overflow-hidden rounded-2xl"
      >
        {/* Header row — always visible */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <FileText size={14} className="flex-shrink-0 text-white/40" />
          <span className="text-sm font-light text-white/55">
            Curriculum Vitae
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-auto text-white/25"
          >
            ↓
          </motion.span>
        </div>

        {/* Expanded preview */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/[0.06] px-5 pb-5 pt-4"
            >
              {/* Mini CV content */}
              <div className="mb-3 flex items-center gap-2 text-xs text-white/30">
                <GraduationCap size={11} />
                <span className="font-light">
                  {config.education[1].school} · {config.education[1].year}
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2 text-xs text-white/30">
                <Languages size={11} />
                <span className="font-light">
                  {config.languages.map((l) => `${l.name} ${l.level}`).join(" · ")}
                </span>
              </div>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {config.technologies.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Download button — magnetic */}
              <motion.a
                ref={ref}
                href="/CV_Valentin_Alcala.pdf"
                download
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-4 py-2 text-xs font-light text-cyan-400/80 transition-all hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <Download size={11} />
                Télécharger CV
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
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
        {/* Left column */}
        <div className="sm:sticky sm:top-24 sm:w-60 sm:flex-shrink-0">
          <SectionLabel>Parcours</SectionLabel>
          <TextReveal
            as="h2"
            className="mt-2 block text-3xl font-light tracking-heading text-gradient"
          >
            Formation
          </TextReveal>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/35">
            Deux ans de BTS SIO puis un Bachelor Web pour maîtriser la conception
            d'applications fullstack modernes.
          </p>

          {/* Availability badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-2 text-xs font-light text-cyan-400/80">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
            </span>
            Disponible alternance 2024-2025 · MyDigitalSchool Caen
          </div>

          <CVPreview />
        </div>

        {/* Right — timeline */}
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
