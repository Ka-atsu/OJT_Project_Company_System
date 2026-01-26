// ProjectCard.jsx
import { motion } from "framer-motion";
import { useRef } from "react";
import { FADE_UP } from "../../../motion/constants";
import { useScrollbar } from "./useScrollbar";

export default function ProjectCard({ title, scope, images = [] }) {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useScrollbar({ scrollerRef, trackRef, thumbRef });

  return (
    <motion.article className="project-card" variants={FADE_UP}>
      <div
        className="project-media-scroll"
        ref={scrollerRef}
        aria-label={`${title} gallery`}
        tabIndex={0}
      >
        {images.map((src, idx) => (
          <div className="project-media-item" key={`${idx}-${src}`}>
            <img src={src} alt={`${title} image ${idx + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="project-scrollbar" ref={trackRef} aria-hidden="true">
        <div className="project-scrollbar-thumb" ref={thumbRef} />
      </div>

      <h3 className="project-title">{title}</h3>
      <p className="project-scope">{scope}</p>
    </motion.article>
  );
}
