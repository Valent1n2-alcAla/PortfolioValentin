import { useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "../../hooks/useCursor";

export default function Cursor() {
  const { variant } = useCursor();
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 500, damping: 32, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 32, mass: 0.4 });

  useEffect(() => {
    function move(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  const isProject = variant === "project";

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-50%", top: 0, left: 0 }}
    >
      <motion.div
        animate={{
          width: isProject ? 76 : 10,
          height: isProject ? 76 : 10,
          backgroundColor: isProject
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.75)",
          borderRadius: "50%",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        <AnimatePresence>
          {isProject && (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="select-none text-[10px] font-semibold tracking-wide text-black"
            >
              Voir
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
