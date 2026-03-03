import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAP_ROUTES = new Set(["/", "/services"]);

const GSAP_TRIGGER_IDS = {
  "/": ["home-hero-pin", "home-hero-parallax"],
  "/services": ["services-hero-pin", "services-hero-parallax"],
};

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef(null);

  useLayoutEffect(() => {
    const prev = prevPathRef.current;

    if (prev && GSAP_TRIGGER_IDS[prev]) {
      GSAP_TRIGGER_IDS[prev].forEach((id) => {
        ScrollTrigger.getById(id)?.kill(true);
      });
    }

    prevPathRef.current = pathname;

    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (!GSAP_ROUTES.has(pathname)) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    });
  }, [pathname]);

  return null;
}
