import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "../../hooks/useSpotlight";
import { useCursor } from "../../hooks/useCursor";
import TextReveal from "../TextReveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  span: "wide" | "normal";
  github?: string;
}

const PLACEHOLDER = "https://placehold.co/600x400/1e293b/white?text=Illustration+Projet";

const PROJECTS: Project[] = [
  {
    title: "Portfolio Web",
    description:
      "Ce portfolio — React, TypeScript, Tailwind. Design Aura System avec orbs, glassmorphism, spotlight et cursor custom.",
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
  const { ref, pos, onMouseMove, onMouseLeave: spotlightLeave } = useSpotlight();
  const { setVariant } = useCursor();

  /* Parallax state for tech tags on image */
  const [tagOffset, setTagOffset] = useState({ x: 0, y: 0 });

  /* Dynamic shadow based on spotlight pos */
  const shadowX = pos.opacity ? -(pos.x - 150) * 0.06 : 0;
  const shadowY = pos.opacity ? -(pos.y - 80) * 0.05 + 12 : 12;
  const boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,${pos.opacity ? 0.12 : 0.05})`;

  function handleImageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTagOffset({ x: nx * 7, y: ny * 4 });
  }

  function handleImageMouseLeave() {
    setTagOffset({ x: 0, y: 0 });
  }

  function handleLeave() {
    spotlightLeave();
    setVariant("default");
  }

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      onMouseMove={onMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setVariant("project")}
      whileHover={{ borderColor: "rgba(255,255,255,0.22)" }}
      animate={{ boxShadow }}
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
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(120,200,255,0.065), transparent 40%)`,
        }}
      />

      {/* Image + parallax tags */}
      <div
        className="relative h-44 overflow-hidden rounded-t-2xl bg-[#111827] sm:h-52"
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
      >
        <img
          src={PLACEHOLDER}
          alt={`Illustration ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0d1220] to-transparent" />

        {/* Floating tech tags — parallax */}
        <motion.div
          animate={{ x: tagOffset.x, y: tagOffset.y }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
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
        <TextReveal as="h2" className="mt-2 block text-3xl font-light tracking-heading text-gradient">
          Projets
        </TextReveal>
      </motion.div>

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
