import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "../../hooks/useSpotlight";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  /** "wide" = col-span-2, "normal" = col-span-1 */
  span: "wide" | "normal";
}

const PLACEHOLDER = "https://placehold.co/600x400/1e293b/white?text=Illustration+Projet";

const PROJECTS: Project[] = [
  {
    title: "Portfolio Web",
    description:
      "Ce portfolio — React, TypeScript, Tailwind CSS. Design Aura System avec orbs, glassmorphism et spotlight cards.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    span: "wide",
    github: "https://github.com/Valent1n2-alcAla/PortfolioValentin",
  },
  {
    title: "Gestion de Stock",
    description:
      "Application de gestion d'inventaire avec authentification, rôles utilisateurs et tableaux de bord.",
    tags: ["Symfony", "PHP", "MySQL"],
    span: "normal",
  },
  {
    title: "API REST Spring Boot",
    description:
      "API RESTful avec authentification JWT et documentation Swagger auto-générée.",
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

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

function ProjectCard({ project }: { project: Project }) {
  const { ref, pos, onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
      transition={{ duration: 0.35 }}
      className={[
        "glass-card group relative flex flex-col overflow-hidden rounded-2xl",
        project.span === "wide" ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(120,180,255,0.07), transparent 40%)`,
        }}
      />

      {/* Image — zooms on group hover */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl bg-[#111827] sm:h-52">
        <img
          src={PLACEHOLDER}
          alt={`Illustration ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        />
        {/* Bottom fade to card bg */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0d1220] to-transparent" />
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15px] font-normal text-white/80">{project.title}</h3>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir sur GitHub"
                className="mt-0.5 flex-shrink-0 text-white/20 transition-colors duration-300 group-hover:text-white/55"
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <p className="mt-2.5 text-sm font-light leading-relaxed text-white/35">
            {project.description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs font-light text-white/35"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mb-10"
      >
        <p className="text-xs font-light uppercase tracking-[0.2em] text-white/25">
          Réalisations
        </p>
        <h2 className="mt-2 text-3xl font-light tracking-heading text-gradient">
          Projets
        </h2>
      </motion.div>

      {/* Bento grid asymétrique : wide | normal → normal | wide */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
