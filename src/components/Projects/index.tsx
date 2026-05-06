import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      "Ce portfolio — React, TypeScript, Tailwind CSS. Design Engineer Dashboard minimaliste avec animations Framer Motion.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    wide: true,
    github: "https://github.com/Valent1n2-alcAla/PortfolioValentin",
  },
  {
    title: "Gestion de Stock",
    description:
      "Application web de gestion d'inventaire avec authentification, rôles et tableaux de bord dynamiques.",
    tags: ["Symfony", "PHP", "MySQL"],
  },
  {
    title: "API REST Spring Boot",
    description:
      "API RESTful avec authentification JWT, gestion des ressources et documentation Swagger.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "App Mobile Kotlin",
    description:
      "Application Android native pour la gestion de tâches avec synchronisation cloud.",
    tags: ["Kotlin", "Android", "Firebase"],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#aaa]">
          Réalisations
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-heading text-[#111]">
          Projets
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.title}
            variants={card}
            whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.2 }}
            className={[
              "group flex flex-col justify-between rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm",
              i === 0 ? "sm:col-span-2" : "",
            ].join(" ")}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-[#111]">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Voir sur GitHub"
                    className="mt-0.5 flex-shrink-0 text-[#bbb] transition-colors group-hover:text-[#111]"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#666]">
                {project.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#ececec] bg-[#fafafa] px-2.5 py-0.5 text-xs font-medium text-[#666]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
