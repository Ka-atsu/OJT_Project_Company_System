import { useEffect, useRef, useState } from "react";

export function useTypewriter(
  text,
  { active = true, speed = 35, delay = 0 } = {},
) {
  const idxRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  // reset when text changes
  useEffect(() => {
    idxRef.current = 0;
    setValue("");
    setDone(false);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, [text]);

  useEffect(() => {
    // pause when not active
    if (!active) {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
      return;
    }

    // already finished
    if (done) return;

    // already running
    if (intervalRef.current) return;

    const tick = () => {
      intervalRef.current = window.setInterval(
        () => {
          idxRef.current += 1;
          setValue(text.slice(0, idxRef.current));

          if (idxRef.current >= text.length) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
            setDone(true);
          }
        },
        Math.max(10, speed),
      );
    };

    // delay only when starting from 0
    if (delay > 0 && idxRef.current === 0) {
      timeoutRef.current = window.setTimeout(tick, delay);
    } else {
      tick();
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    };
  }, [active, speed, delay, text, done]);

  return { value, done };
}
