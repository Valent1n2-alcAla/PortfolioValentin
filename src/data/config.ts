export interface Project {
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

export const projects: Project[] = [
  {
    title: "InterVizio",
    subtitle: "Réalisé en stage",
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
    image: "./public/img/intervizio.jpg",
  },
  {
    title: "E-Music",
    subtitle: "Réalisé en formation",
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
    image: "./public/img/emusic.jpg",
  },
  {
    title: "Portfolio 2026",
    subtitle: "Projet personnel",
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
    image: "./public/portfolio-2026.png",
  },
];

export const config = {
  identity: {
    name: "Valentin ALCALA",
    email: "alcalavalentin55@gmail.com",
    role: "Développeur Web Full-Stack",
  },

  education: [
    {
      degree: "BTS SIO (Services Informatiques aux Organisations)",
      school: "Lycée Jean Rostand",
      location: "France",
      year: "2023 – 2025",
    },
    {
      degree: "Bachelor Web (Concepteur Développeur d'Applications)",
      school: "MyDigitalSchool Caen",
      location: "Caen, France",
      year: "2025 – 2026",
    },
  ],

  technologies: [
    "PHP",
    "Symfony",
    "Java",
    "Spring Boot",
    "Kotlin",
    "JavaScript",
    "TypeScript",
    "React",
    "HTML / CSS",
    "SQL",
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "C1" },
    { name: "Espagnol", level: "B2" },
  ],

  social: {
    github: "https://github.com/Valent1n2-alcAla",
    linkedin: "",
  },
} as const;

export type Config = typeof config;
