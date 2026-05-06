import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { CursorProvider } from "./hooks/useCursor";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const TechStack = lazy(() => import("./components/TechStack"));
const Contact = lazy(() => import("./components/Contact"));

/* Static SVG grain — 200px tile, opacity 0.04 */
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        opacity: 0.038,
        mixBlendMode: "overlay",
      }}
    />
  );
}

function Orbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-cyan-500/10"
        style={{ filter: "blur(150px)" }}
      />
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

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f19]">
      <GrainOverlay />
      <Orbs />
      <Cursor />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Divider />
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Divider />
          <Suspense fallback={null}>
            <About />
          </Suspense>
          <Divider />
          <Suspense fallback={null}>
            <TechStack />
          </Suspense>
          <Divider />
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </main>
        <footer className="border-t border-white/[0.06] py-8">
          <p className="text-center text-xs text-white/20">
            © 2025 Valentin ALCALA
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CursorProvider>
  );
}
