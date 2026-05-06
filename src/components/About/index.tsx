import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { config } from "../../data/config";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const row = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
      >
        {/* Left — heading + CV */}
        <div className="sm:sticky sm:top-24 sm:w-56 sm:flex-shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#aaa]">
            Parcours
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-heading text-[#111]">
            Formation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#666]">
            Deux ans en BTS SIO, puis un Bachelor Web pour approfondir la
            conception d'applications modernes.
          </p>
          <a
            href="/CV_Valentin_Alcala.pdf"
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ececec] bg-white px-5 py-2.5 text-sm font-semibold text-[#111] shadow-sm transition-shadow hover:shadow-md"
          >
            <Download size={14} />
            Télécharger mon CV
          </a>
        </div>

        {/* Right — timeline */}
        <div className="flex-1">
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative border-l border-[#ececec] pl-8"
          >
            {config.education.map((edu, i) => (
              <motion.li
                key={i}
                variants={row}
                className={i < config.education.length - 1 ? "mb-10" : ""}
              >
                {/* Dot */}
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#111] bg-[#fafafa]" />

                <p className="text-xs font-semibold uppercase tracking-widest text-[#aaa]">
                  {edu.year}
                </p>
                <h3 className="mt-1.5 text-base font-semibold text-[#111]">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-[#666]">
                  {edu.school} — {edu.location}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Languages */}
          <div className="mt-12 border-t border-[#ececec] pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#aaa]">
              Langues
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {config.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="rounded-xl border border-[#ececec] bg-white px-4 py-2.5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-[#111]">
                    {lang.name}
                  </p>
                  <p className="text-xs text-[#888]">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
