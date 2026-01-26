import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./PreloaderVideo.css";

export default function PreloaderVideo({ onDone, durationMs }) {
  const fallbackRef = useRef(null);

  const clearFallback = () => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  };

  // cleanup on unmount
  useEffect(() => clearFallback, []);

  const startFallback = () => {
    // start only once, and only when video actually starts
    if (fallbackRef.current) return;
    fallbackRef.current = setTimeout(() => {
      onDone?.();
    }, durationMs + 4000); // buffer room (example: 18s + 4s)
  };

  return (
    <motion.div
      className="preloaderVideo"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(10px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <video
        className="preloaderVideo-media"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={startFallback}
        onPlaying={startFallback}
        onEnded={() => {
          clearFallback();
          onDone?.();
        }}
        onError={() => {
          clearFallback();
          onDone?.();
        }}
      >
        <source src="/animation/InfiClibLight.mp4" type="video/mp4" />
        {/* <source src="/animation/InifiClib.webm" type="video/webm" /> */}
      </video>

      <button
        className="preloaderVideo-skip"
        onClick={() => {
          clearFallback();
          onDone?.();
        }}
        type="button"
      >
        Skip
      </button>
    </motion.div>
  );
}
