export interface Project {
  title: string;
  subtitle: string;
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
    subtitle: "Projet réalisé en stage",
    tags: ["PHP", "Symfony", "IA", "KPI Dashboards"],
    span: "wide",
    github: GITHUB,
    badge: "IA • Odin",
    image: "https://placehold.co/800x420/f0fdf4/059669?text=InterVizio",
  },
  {
    title: "E-Music",
    subtitle: "Projet en cours de développement",
    tags: ["Symfony 7", "PHP 8.2", "MariaDB", "Turbo", "Stimulus"],
    span: "normal",
    github: GITHUB,
    image: "https://placehold.co/600x420/f0fdf4/059669?text=E-Music",
  },
  {
    title: "Portfolio 2026",
    subtitle: "Projet personnel",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    span: "normal",
    github: GITHUB,
    image: "https://placehold.co/600x420/f0fdf4/059669?text=Portfolio+2026",
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
