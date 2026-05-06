import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "../../hooks/useSpotlight";

interface Project {
  title: string;
  description: string;
  tags: string[];
  wide?: boolean;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Web",
    description:
      "Ce portfolio — React, TypeScript, Tailwind CSS, design Aura System avec orbs flottants et spotlight cards.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    wide: true,
    github: "https://github.com/Valent1n2-alcAla/PortfolioValentin",
  },
  {
    title: "Gestion de Stock",
    description:
      "Application de gestion d'inventaire avec authentification, rôles utilisateurs et tableaux de bord dynamiques.",
    tags: ["Symfony", "PHP", "MySQL"],
  },
  {
    title: "API REST Spring Boot",
    description:
      "API RESTful avec authentification JWT et documentation Swagger auto-générée.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "App Mobile Kotlin",
    description:
      "Application Android native pour la gestion de tâches avec synchronisation cloud Firebase.",
    tags: ["Kotlin", "Android", "Firebase"],
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

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-light uppercase tracking-[0.2em] text-white/25">
      {children}
    </p>
  );
}

interface ProjectCardProps {
  project: Project;
  wide?: boolean;
}

function ProjectCard({ project, wide }: ProjectCardProps) {
  const { ref, pos, onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={[
        "glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-500",
        wide ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.055), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-normal text-white/80">{project.title}</h3>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir sur GitHub"
              className="mt-0.5 flex-shrink-0 text-white/20 transition-colors duration-300 group-hover:text-white/50"
            >
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <p className="mt-2.5 text-sm font-light leading-relaxed text-white/35">
          {project.description}
        </p>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-xs font-light text-white/35"
          >
            {tag}
          </span>
        ))}
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
        <SectionLabel>Réalisations</SectionLabel>
        <h2 className="mt-2 text-3xl font-light tracking-heading text-gradient">
          Projets
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} wide={i === 0} />
        ))}
      </motion.div>
    </section>
  );
}
