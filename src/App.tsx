import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import TechStack from "./components/TechStack";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <main>
          <Hero />
          <div className="mx-auto max-w-5xl border-t border-[#ececec]" />
          <Projects />
          <div className="mx-auto max-w-5xl border-t border-[#ececec]" />
          <About />
          <div className="mx-auto max-w-5xl border-t border-[#ececec]" />
          <TechStack />
        </main>
        <footer className="border-t border-[#ececec] py-8">
          <p className="text-center text-xs text-[#aaa]">
            © 2025 Valentin ALCALA — Tous droits réservés
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
