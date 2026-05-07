const NAV_LINKS = [
  { label: "Projets",  href: "#projects" },
  { label: "Parcours", href: "#about"    },
  { label: "Stack",    href: "#stack"    },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-[#f8fafc]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        <a href="#hero" className="flex items-center gap-1 text-sm font-semibold tracking-tight text-[#1e293b]">
          Valentin
          <span className="text-green-600">.</span>
          Alcala
        </a>

        <ul className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-[#64748b] transition-colors duration-150 hover:text-[#1e293b]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="./public/CV_Valentin_Alcala_Developpeur_Web_Alternance.pdf"
          download
          className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          CV
        </a>
      </nav>
    </header>
  );
}
