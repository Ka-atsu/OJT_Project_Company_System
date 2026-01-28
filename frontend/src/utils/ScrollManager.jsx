import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to it (after the new page renders)
    if (hash) {
      let tries = 0;

      const go = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (tries++ < 30) requestAnimationFrame(go);
      };

      requestAnimationFrame(go);
      return;
    }

    // No hash = normal route change = go top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
