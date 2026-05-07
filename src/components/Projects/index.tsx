import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TextReveal from "../TextReveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  span: "wide" | "normal";
  github?: string;
}

const PLACEHOLDER =
  "https://placehold.co/600x400/f1f5f9/94a3b8?text=Mockup+projet";

const PROJECTS: Project[] = [
  {
    title: "Portfolio Web",
    description:
      "Ce portfolio — React, TypeScript, Tailwind CSS. Design light + typographie Serif/Sans pour un rendu élégant et lisible.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    span: "wide",
    github: "https://github.com/Valent1n2-alcAla/PortfolioValentin",
  },
  {
    title: "Gestion de Stock",
    description:
      "Application de gestion d'inventaire avec authentification, rôles et tableaux de bord.",
    tags: ["Symfony", "PHP", "MySQL"],
    span: "normal",
  },
  {
    title: "API REST Spring Boot",
    description:
      "API RESTful avec JWT, documentation Swagger auto-générée et tests d'intégration.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    span: "normal",
  },
  {
    title: "App Mobile Kotlin",
    description:
      "Application Android native pour la gestion de tâches avec synchronisation Firebase.",
    tags: ["Kotlin", "Android", "Firebase"],
    span: "wide",
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
      {/* Image frame — rounded top, ready for real mockups */}
      <div className="relative overflow-hidden bg-[#f1f5f9]" style={{ height: 200 }}>
        <img
          src={PLACEHOLDER}
          alt={`Aperçu ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Floating tech tags */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-green-100 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-green-700 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-[#1e293b]">
              {project.title}
            </h3>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir sur GitHub"
                className="mt-0.5 flex-shrink-0 text-[#cbd5e1] transition-colors duration-200 group-hover:text-green-600"
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            {project.description}
          </p>
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
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
