import { useRef, useState } from "react";

interface SpotlightPos {
  x: number;
  y: number;
  opacity: number;
}

export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<SpotlightPos>({ x: 0, y: 0, opacity: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }

  function onMouseLeave() {
    setPos((p) => ({ ...p, opacity: 0 }));
  }

  return { ref, pos, onMouseMove, onMouseLeave };
}
