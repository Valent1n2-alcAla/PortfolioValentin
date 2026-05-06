import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-950 grid-pattern">
        {/* Radial glow at top */}
        <div className="pointer-events-none fixed inset-0 radial-glow" />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <TechStack />
        </main>
      </div>
    </BrowserRouter>
  );
}
