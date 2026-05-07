import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import TextReveal from "../TextReveal";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  span: "wide" | "normal";
  github: string;
  badge?: string;
  image: string;
}

const GITHUB = "https://github.com/Valent1n2-alcAla";

const PROJECTS: Project[] = [
  {
    title: "InterVizio",
    subtitle: "SaaS · Gestion d'Interventions",
    description:
      "Plateforme de pilotage pour interventions techniques terrain. Conçue pour rationaliser le cycle complet, de la demande client à la pré-facturation.",
    highlights: [
      "Planification optimisée des trajets pour techniciens",
      "Module de pré-facturation automatisé",
      "Odin — assistant IA dédié au support terrain",
    ],
    tags: ["PHP", "Symfony", "IA", "KPI Dashboards"],
    span: "wide",
    github: GITHUB,
    badge: "IA • Odin",
    image: "https://placehold.co/800x420/f0fdf4/059669?text=InterVizio",
  },
  {
    title: "E-Music",
    subtitle: "ERP · École de Musique",
    description:
      "Solution full-stack Admin / Profs / Élèves pour la gestion administrative et pédagogique d'un établissement musical.",
    highlights: [
      "Plannings interactifs & suivi des dossiers",
      "Facturation modulée par tranches de revenus",
      "Inventaire et contrats de prêt instrumental",
    ],
    tags: ["Symfony 7", "PHP 8.2", "MariaDB", "Turbo", "Stimulus"],
    span: "normal",
    github: GITHUB,
    image: "https://placehold.co/600x420/f0fdf4/059669?text=E-Music",
  },
  {
    title: "Portfolio 2026",
    subtitle: "Expérience Immersive",
    description:
      "Vitrine technologique personnelle axée sur l'UI/UX et la performance. Design minimaliste « Clean Tech » avec accents verts — le projet que vous consultez.",
    highlights: [
      "Animations fluides & scroll reveal",
      "Structure scalable React lazy/Suspense",
      "Optimisation SEO & Core Web Vitals",
    ],
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    span: "normal",
    github: GITHUB,
    image: "https://placehold.co/600x420/f0fdf4/059669?text=Portfolio+2026",
  },
];

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
      <div className="relative overflow-hidden bg-[#f0fdf4]" style={{ height: 200 }}>
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
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
