import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PreloaderVideo from "./preloaderVideo";
import Home from "../landingPage/Home/Home";

export default function HomeEntry() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cameFromInternalNavigation = location.state?.fromInternal;
    if (!cameFromInternalNavigation) {
      setShowIntro(true);
    }
  }, [location.state]);

  const done = () => {
    setShowIntro(false);
  };

  // Improved Scroll Lock + GSAP Sync
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (showIntro) {
      const scrollY = window.scrollY;
      body.dataset.scrollY = String(scrollY);
      Object.assign(body.style, {
        position: "fixed",
        top: `-${scrollY}px`,
        left: "0",
        right: "0",
        width: "100%",
        overflow: "hidden",
      });
      html.style.overflow = "hidden";
      return;
    }

    // --- CLEANUP & RESET ---
    Object.assign(body.style, {
      position: "",
      top: "",
      left: "",
      right: "",
      width: "",
      overflow: "",
    });
    html.style.overflow = "";
    delete body.dataset.scrollY;

    // 1. Force jump to top
    window.scrollTo(0, 0);

    // 2. Tell GSAP to recalculate everything now that the DOM is stable
    // We use a small timeout to let React finish the "unmount" of the preloader
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <>
      <Home />
      <AnimatePresence mode="wait">
        {showIntro && (
          <PreloaderVideo
            key="home-preloader"
            onDone={done}
            durationMs={18000}
          />
        )}
      </AnimatePresence>
    </>
  );
}
