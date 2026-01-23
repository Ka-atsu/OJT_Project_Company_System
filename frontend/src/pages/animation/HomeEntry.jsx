import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import PreloaderVideo from "./preloaderVideo";
import Home from "../landingPage/Home/Home";

export default function HomeEntry() {
  const [showIntro, setShowIntro] = useState(true);
  const done = () => setShowIntro(false);

  // ✅ Lock scroll while intro is active (works well on iOS too)
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (showIntro) {
      const scrollY = window.scrollY;

      body.dataset.scrollY = String(scrollY);
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";

      html.style.overflow = "hidden";
      return;
    }

    // unlock
    const y = parseInt(body.dataset.scrollY || "0", 10);

    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";
    html.style.overflow = "";

    delete body.dataset.scrollY;
    window.scrollTo(0, y);
  }, [showIntro]);

  // optional fallback (> 18s)
  useEffect(() => {
    if (!showIntro) return;
    const t = setTimeout(done, 22000);
    return () => clearTimeout(t);
  }, [showIntro]);

  return (
    <>
      {/* Home can be mounted behind so it won't "pop" */}
      <Home />

      <AnimatePresence mode="wait">
        {showIntro && <PreloaderVideo key="home-preloader" onDone={done} />}
      </AnimatePresence>
    </>
  );
}
