const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <nav className="glass flex items-center justify-between rounded-2xl px-6 py-3 shadow-lg shadow-black/30">
        <span className="text-sm font-semibold tracking-wide text-white">
          V<span className="text-indigo-400">.</span>ALCALA
        </span>
        <ul className="flex gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
