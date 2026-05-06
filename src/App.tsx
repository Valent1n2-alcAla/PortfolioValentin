import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-950 grid-pattern">
        <div className="pointer-events-none fixed inset-0 radial-glow" />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Projects />
          <TechStack />
        </main>
      </div>
    </BrowserRouter>
  );
}
