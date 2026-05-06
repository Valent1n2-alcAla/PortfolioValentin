import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (d: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, delay: d, ease },
  }),
};

export default function TextReveal({
  children,
  className,
  as: Tag = "span",
  delay = 0,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <Tag className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.27em" }}
        >
          <motion.span
            className="inline-block"
            custom={delay + i * 0.065}
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
