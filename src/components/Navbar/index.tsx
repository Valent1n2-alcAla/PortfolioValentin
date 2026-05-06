const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projects" },
  { label: "Parcours", href: "#about" },
  { label: "Stack", href: "#stack" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#ececec]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight text-[#111]">
          Valentin Alcala
        </span>
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-[#666] transition-colors duration-150 hover:text-[#111]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:alcalavalentin55@gmail.com"
          className="rounded-full bg-[#111] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
