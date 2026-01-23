import { motion } from "framer-motion";
import "./PreloaderVideo.css";

export default function PreloaderVideo({ onDone }) {
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
        onEnded={onDone}
        onError={onDone}
      >
        <source src="/animation/InifiClib.mp4" type="video/mp4" />
        <source src="/animation/InifiClib.webm" type="video/webm" />
      </video>

      <button className="preloaderVideo-skip" onClick={onDone} type="button">
        Skip
      </button>
    </motion.div>
  );
}
