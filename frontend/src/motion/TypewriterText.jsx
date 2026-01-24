import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";

export default function TypewriterText({
  as: Comp = "span",
  text,
  start = "inView", // "inView" | "mount"
  speed = 35,
  delay = 0,
  cursor = true,
  inViewOptions = { once: true, amount: 0.2 },
  className,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, inViewOptions);

  const active = start === "mount" ? true : inView;
  const { value, done } = useTypewriter(text, { active, speed, delay });

  return (
    <Comp ref={ref} className={className} {...rest}>
      {value}
      {cursor && (
        <span
          className={`tw-cursor ${done ? "" : "tw-cursor--blink"}`}
          aria-hidden="true"
        >
        </span>
      )}
    </Comp>
  );
}
