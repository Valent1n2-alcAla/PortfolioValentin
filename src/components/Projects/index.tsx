import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  span?: "col" | "row" | "both";
  accent: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Web",
    description:
      "Ce portfolio — conçu en React/TypeScript avec animations Framer Motion et design Engineer Dashboard.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    span: "col",
    accent: "from-indigo-500/20 to-purple-500/10",
    github: "https://github.com/Valent1n2-alcAla/PortfolioValentin",
  },
  {
    title: "Gestion de Stock",
    description:
      "Application web de gestion d'inventaire avec authentification, rôles utilisateurs et tableaux de bord dynamiques.",
    tags: ["Symfony", "PHP", "MySQL", "Twig"],
    accent: "from-violet-500/20 to-pink-500/10",
  },
  {
    title: "API REST Spring Boot",
    description:
      "API RESTful complète avec authentification JWT, gestion des ressources et documentation Swagger.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
    accent: "from-orange-500/20 to-red-500/10",
  },
  {
    title: "App Mobile Kotlin",
    description:
      "Application Android native pour la gestion de tâches avec synchronisation cloud et notifications push.",
    tags: ["Kotlin", "Android", "Firebase"],
    accent: "from-purple-500/20 to-blue-500/10",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white">Projets</h2>
        <p className="mt-2 text-sm text-slate-500">Quelques réalisations</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.title}
            variants={card}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={[
              "glass group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6",
              i === 0 ? "sm:col-span-2" : "",
            ].join(" ")}
          >
            {/* Gradient accent */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60`}
            />

            <div className="relative">
              <h3 className="text-base font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
            </div>

            <div className="relative mt-6 flex items-end justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex-shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:text-white"
                  aria-label="GitHub"
                >
                  <GitFork size={15} />
                </a>
              )}
              {!project.github && (
                <span className="ml-auto flex-shrink-0 rounded-lg border border-white/5 bg-white/5 p-2 text-slate-600">
                  <ExternalLink size={15} />
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
