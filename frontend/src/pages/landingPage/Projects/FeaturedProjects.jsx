// FeaturedProjects.jsx
import { useMemo, useState } from "react";

function FeaturedCard({ project }) {
  const cover = project.images?.[0];

  return (
    <article className="featured-card">
      <div className="featured-media">
        <img src={cover} alt={project.title} loading="lazy" draggable={false} />
      </div>

      <div className="featured-body">
        <h3 className="featured-title">{project.title}</h3>

        <p className="featured-meta">
          <span className="featured-meta-dot">•</span> {project.location}
        </p>

        <p className="featured-blurb">{project.blurb}</p>

        <div className="featured-tags">
          {project.tags?.slice(0, 3).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects({ featured }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return featured.items;
    return featured.items.filter(
      (p) => p.category === active || p.tags?.includes(active),
    );
  }, [active, featured.items]);

  return (
    <section className="section projects-featured">
      <div className="projects-featured-head">
        <h2 className="projects-section-title">{featured.title}</h2>

        <div
          className="projects-filters"
          role="tablist"
          aria-label="Project filters"
        >
          {featured.filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`projects-filter ${active === f ? "is-active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="featured-grid">
        {filtered.slice(0, 3).map((p) => (
          <FeaturedCard key={p.title} project={p} />
        ))}
      </div>

      <div className="projects-featured-cta">
        <button type="button" className="projects-cta-btn">
          View All Projects
        </button>
      </div>
    </section>
  );
}
