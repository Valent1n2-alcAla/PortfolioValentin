import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { CursorProvider } from "./hooks/useCursor";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Projects = lazy(() => import("./components/Projects"));
const About    = lazy(() => import("./components/About"));
const TechStack = lazy(() => import("./components/TechStack"));
const Contact  = lazy(() => import("./components/Contact"));

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="border-t border-[#e2e8f0]" />
    </div>
  );
}

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8fafc]">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Suspense fallback={null}><Projects /></Suspense>
        <Divider />
        <Suspense fallback={null}><About /></Suspense>
        <Divider />
        <Suspense fallback={null}><TechStack /></Suspense>
        <Divider />
        <Suspense fallback={null}><Contact /></Suspense>
      </main>
      <footer className="border-t border-[#e2e8f0] py-8">
        <p className="text-center text-xs text-[#94a3b8]">
          © 2025 Valentin ALCALA — Tous droits réservés
        </p>
      </footer>
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
