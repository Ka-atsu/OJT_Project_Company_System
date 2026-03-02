import { useState, useMemo } from "react";

function FeaturedCard({ project }) {
  const cover =
    project.photos?.[0]?.url || project.photos?.[0]?.path || "/placeholder.jpg";

  return (
    <article className="featured-card">
      <div className="featured-media">
        <img src={cover} alt={project.name} loading="lazy" draggable={false} />
      </div>

      <div className="featured-body">
        <h3 className="featured-title">{project.name}</h3>

        <p className="featured-meta">
          <span className="featured-meta-dot">•</span>
          {project.address}
        </p>

        <p className="featured-blurb">{project.description}</p>
      </div>
    </article>
  );
}

export default function FeaturedProjects({ title, items = [], loading }) {
  if (loading) return <p>Loading featured projects...</p>;

  return (
    <section className="section projects-featured">
      <div className="projects-featured-head">
        <h2 className="projects-section-title">{title}</h2>
      </div>

      <div className="featured-grid">
        {items.slice(0, 6).map((p) => (
          <FeaturedCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
