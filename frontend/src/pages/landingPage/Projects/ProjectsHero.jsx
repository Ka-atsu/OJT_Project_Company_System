// ProjectsHero.jsx
import { useMemo } from "react";

function getSrc(v) {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") return v.src || v.default || "";
  return "";
}

export default function ProjectsHero({
  images = [],
  duration = 18, // seconds (lower = faster)
  direction = "right", // "right" or "left"
}) {
  const slides = useMemo(() => {
    const cleaned = (images || []).map(getSrc).filter(Boolean);
    if (!cleaned.length) return [];
    // duplicate track for seamless looping
    return [...cleaned, ...cleaned];
  }, [images]);

  return (
    <section className="hero hero--editorial full-bleed projects-hero">
      <div className="projects-hero-inner">
        {!!slides.length && (
          <div
            className="projects-hero-marquee"
            style={{
              "--duration": `${duration}s`,
              "--dir": direction === "right" ? "1" : "-1",
            }}
            aria-hidden="true"
          >
            <div className="projects-hero-track">
              {slides.map((src, i) => (
                <div className="projects-hero-tile" key={`${i}-${src}`}>
                  <img src={src} alt="" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
