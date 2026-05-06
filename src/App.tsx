import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import TechStack from "./components/TechStack";

/* Floating background orbs */
function Orbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Top-left blue orb */}
      <div
        className="absolute -top-32 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Top-right violet orb */}
      <div
        className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Bottom-center subtle orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #1e3a5f 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
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
      <div className="relative min-h-screen" style={{ backgroundColor: "#030303" }}>
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
            <p className="text-center text-xs text-white/30">
              © 2025 Valentin ALCALA
            </p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
