import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import TechStack from "./components/TechStack";

function Orbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Cyan aura — top left */}
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-cyan-500/10"
        style={{ filter: "blur(150px)" }}
      />
      {/* Magenta aura — bottom right */}
      <div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-fuchsia-500/10"
        style={{ filter: "blur(150px)" }}
      />
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="border-t border-white/[0.06]" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0b0f19]">
        <Orbs />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Divider />
            <Projects />
            <Divider />
            <About />
            <Divider />
            <TechStack />
          </main>
          <footer className="border-t border-white/[0.06] py-8">
            <p className="text-center text-xs text-white/20">
              © 2025 Valentin ALCALA
            </p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
