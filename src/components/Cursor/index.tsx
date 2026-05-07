import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);

  /* Highly reactive spring — near-instant follow */
  const x = useSpring(rawX, { stiffness: 1000, damping: 28 });
  const y = useSpring(rawY, { stiffness: 1000, damping: 28 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    }

    /* Single delegated listener — detects a/button ancestors */
    function onOver(e: MouseEvent) {
      const interactive = !!(e.target as HTMLElement).closest("a, button");
      setHovered(interactive);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
    >
      <motion.span
        animate={{ scale: hovered ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          display: "block",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "1.5px solid white",
        }}
      />
    </motion.div>
  );
}
