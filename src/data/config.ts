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
