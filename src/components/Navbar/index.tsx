const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projects" },
  { label: "Parcours", href: "#about" },
  { label: "Stack", href: "#stack" },
];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ backgroundColor: "rgba(3, 3, 3, 0.75)", backdropFilter: "blur(20px)" }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight text-white/90">
          Valentin Alcala
        </span>

        <ul className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-light text-white/40 transition-colors duration-200 hover:text-white/90"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:alcalavalentin55@gmail.com"
          className="rounded-full border border-white/10 px-4 py-1.5 text-sm font-light text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
