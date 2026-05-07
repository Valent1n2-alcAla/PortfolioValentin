import { motion } from "framer-motion";
import { Download, GraduationCap, Languages } from "lucide-react";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const row = {
  hidden:  { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

/* ─── CV Card ────────────────────────────────────────────── */
function CVCard() {
  const { ref, offset, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(0.18);

  return (
    <div className="card mt-8 overflow-hidden rounded-2xl">
      {/* Card header */}
      <div className="border-b border-[#e2e8f0] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
            <span className="text-sm font-bold text-green-700">VA</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1e293b]">
              {config.identity.name}
            </p>
            <p className="text-xs text-[#64748b]">{config.identity.role}</p>
          </div>
        </div>
      </div>

      {/* Infos */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-2">
          <GraduationCap size={13} className="mt-0.5 flex-shrink-0 text-green-600" />
          <p className="text-xs text-[#64748b]">
            {config.education[1].school} · {config.education[1].year}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Languages size={13} className="mt-0.5 flex-shrink-0 text-green-600" />
          <p className="text-xs text-[#64748b]">
            {config.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
          </p>
        </div>

        {/* Top techs */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {config.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Download button — green fill on hover */}
      <div className="border-t border-[#e2e8f0] px-5 py-4">
        <motion.a
          ref={ref}
          href="./public/CV_Valentin_Alcala_Developpeur_Web_Alternance.pdf"
          download
          animate={{ x: offset.x, y: offset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group inline-flex items-center gap-2 rounded-full border border-green-600 px-5 py-2 text-sm font-medium text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white"
        >
          <Download size={13} />
          Télécharger le PDF complet
        </motion.a>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-20"
      >
        {/* ── Left column ── */}
        <div className="sm:sticky sm:top-24 sm:w-64 sm:flex-shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
            Parcours
          </p>
          <TextReveal
            as="h2"
            className="font-display mt-2 block text-3xl font-medium tracking-display text-[#1e293b]"
          >
            Formation
          </TextReveal>
          <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
            Deux ans de BTS SIO puis un Bachelor Web pour maîtriser la
            conception d'applications fullstack modernes.
          </p>

          {/* Availability banner */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-medium text-green-700">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
            </span>
            Disponible alternance 2025-2026 · MyDigitalSchool Caen
          </div>

          <CVCard />
        </div>

        {/* ── Right column — timeline ── */}
        <div className="flex-1">
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative space-y-10 border-l-2 border-[#e2e8f0] pl-8"
          >
            {config.education.map((edu, i) => (
              <motion.li key={i} variants={row} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-green-500 bg-white" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-600">
                  {edu.year}
                </p>
                <h3 className="mt-1.5 text-base font-semibold text-[#1e293b]">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-[#64748b]">
                  {edu.school} — {edu.location}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Languages */}
          <div className="mt-14 border-t border-[#e2e8f0] pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
              Langues
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {config.languages.map((lang) => (
                <div key={lang.name} className="card rounded-xl px-4 py-2.5">
                  <p className="text-sm font-semibold text-[#1e293b]">{lang.name}</p>
                  <p className="text-xs text-[#94a3b8]">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
