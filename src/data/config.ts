export interface Project {
  title: string;
  subtitle: string;
  span: "wide" | "normal";
  github: string;
  image: string;
}

const GITHUB = "https://github.com/Valent1n2-alcAla";

export const projects: Project[] = [
  {
    title: "InterVizio",
    subtitle: "Projet réalisé en stage",
    span: "wide",
    github: GITHUB,
    image: "./public/img/intervizio.jpg",
  },
  {
    title: "E-Music",
    subtitle: "Projet en cours de développement",
    span: "normal",
    github: GITHUB,
    image: "./public/img/emusic.jpg",
  },
  {
    title: "Portfolio 2026",
    subtitle: "Projet personnel",
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
