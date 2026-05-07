import { motion } from "framer-motion";
import { projects, type Project } from "../../data/config";
import TextReveal from "../TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.65, ease } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.22, ease } }}
      className={[
        "group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md",
        project.span === "wide" ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
        <img
          src={project.image}
          alt={`Aperçu ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Title + Subtitle */}
      <div className="px-5 py-4">
        <h3 className="text-sm font-bold text-[#1e293b]">{project.title}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{project.subtitle}</p>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
          Réalisations
        </p>
        <TextReveal
          as="h2"
          className="font-display mt-2 block text-3xl font-medium tracking-display text-[#1e293b]"
        >
          Projets
        </TextReveal>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
