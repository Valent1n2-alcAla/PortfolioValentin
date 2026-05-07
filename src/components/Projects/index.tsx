import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "../../data/config";
import TextReveal from "../TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden:   { opacity: 0, y: 28, scale: 0.97 },
  visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.65, ease } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={[
        "card group flex flex-col overflow-hidden rounded-3xl transition-shadow duration-300",
        project.span === "wide" ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-[#e2e8f0] bg-white">
        <img
          src={project.image}
          alt={`Aperçu ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* AI badge */}
        {project.badge && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-green-700 backdrop-blur-sm">
            <Sparkles size={10} />
            {project.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-[#1e293b]">{project.title}</h3>
              <p className="mt-0.5 text-xs font-medium text-green-600">{project.subtitle}</p>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir sur GitHub"
              className="mt-0.5 flex-shrink-0 text-[#cbd5e1] transition-colors duration-200 group-hover:text-green-600"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="mt-3 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
          Réalisations
        </p>
        <TextReveal
          as="h2"
          className="font-display mt-2 block text-3xl font-medium tracking-display text-[#1e293b]"
        >
          Projets
        </TextReveal>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
