import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SplitKinetic() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Push HARDER so they almost collide
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <div ref={ref} className="split-headline">
      <motion.h2 className="kinetic-headline small" style={{ x: xLeft }}>
        SUPPLY
      </motion.h2>

      <motion.h2 className="kinetic-headline small light" style={{ x: xRight }}>
        DEVELOPMENT
      </motion.h2>
    </div>
  );
}
