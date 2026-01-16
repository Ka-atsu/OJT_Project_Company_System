import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function KineticHeadline({ text, size = "big" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.15]);

  return (
    <motion.h1
      ref={ref}
      style={{ x, opacity }}
      className={`kinetic-headline ${size}`}
    >
      {text}
    </motion.h1>
  );
}
