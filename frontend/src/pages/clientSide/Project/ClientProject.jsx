import { useMemo, useState } from "react";
import "./project.css";
import {
  ImgAggregates,
  ImgBackfill,
  ImgConstructionSite,
  ImgEarthmoving,
} from "../../../assets/images";

function ProjectRow({ project, onClick }) {
  const statusClass = project.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <button
      type="button"
      className="project-row project-row-btn"
      onClick={() => onClick(project)}
    >
      <div className="project-main">
        <div className="project-meta">
          <h6 className="project-title">{project.name}</h6>
          <p className="project-subtitle">{project.type}</p>
        </div>
      </div>

      <div className={`project-status ${statusClass}`}>{project.status}</div>
    </button>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);

  if (!project) return null;

  // Backend-ready:
  // later this should be an array of URLs from Laravel, e.g.:
  // images: ["https://cdn.../1.jpg", "https://cdn.../2.jpg"]
  const images =
    Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [ImgConstructionSite];

  const mainSrc = images[Math.min(activeImg, images.length - 1)];

  return (
    <section className="project-overlay" role="dialog" aria-modal="true">
      <button
        className="project-overlay-bg"
        type="button"
        onClick={onClose}
        aria-label="Close overlay"
      />

      <div className="project-modal">
        <div className="project-modal-top">
          <div>
            <h2 className="project-modal-title">{project.name}</h2>
            <p className="project-modal-subtitle">{project.type}</p>
          </div>

          <button
            className="project-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-grid">
            <div className="project-modal-item">
              <span className="project-modal-label">Project Address</span>
              <p className="project-modal-value">
                {project.address || "Not provided yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Starting Date</span>
              <p className="project-modal-value">
                {project.startDate || "Not provided yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Completed Date</span>
              <p className="project-modal-value">
                {project.completedDate || "Not completed yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Status</span>
              <p className="project-modal-value">{project.status}</p>
            </div>
          </div>

          {/* Image / progress photos */}
          <div className="project-modal-media">
            <div className="project-modal-media-bar">
              <span className="project-modal-count">
                {images.length > 1 ? `Photos (${images.length})` : "Photo"}
              </span>
            </div>

            <div className="project-modal-media-main">
              <img
                className="project-modal-img"
                src={mainSrc}
                alt={`${project.name} progress`}
              />
            </div>

            {images.length > 1 && (
              <div className="project-modal-thumbs" role="list">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`project-modal-thumb ${
                      idx === activeImg ? "is-active" : ""
                    }`}
                    onClick={() => setActiveImg(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img
                      className="project-modal-thumb-img"
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    id: 1,
    name: "Random Building Somewhere",
    type: "Commercial Building",
    status: "In Progress",
    address: "Laguna, Philippines",
    startDate: "Jan 12, 2026",
    completedDate: null,
    images: [ImgConstructionSite, ImgEarthmoving, ImgBackfill],
  },
  {
    id: 2,
    name: "2nd Random Building Somewhere",
    type: "Commercial Building",
    status: "Completed",
    address: "Cavite, Philippines",
    startDate: "Oct 01, 2025",
    completedDate: "Jan 18, 2026",
    images: [ImgAggregates, ImgConstructionSite],
  },
  {
    id: 3,
    name: "3rd Random Building Somewhere",
    type: "Commercial Building",
    status: "Active",
    address: null,
    startDate: "Feb 01, 2026",
    completedDate: null,
    images: [ImgEarthmoving],
  },
  { id: 4, name: "4th Building", type: "Residential", status: "In Progress" },
  { id: 5, name: "5th Building", type: "Residential", status: "Completed" },
  { id: 6, name: "6th Building", type: "Commercial", status: "Active" },
  { id: 7, name: "7th Building", type: "Commercial", status: "In Progress" },
];

export default function ClientProject() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 6;

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter(
          (p) => p.status.toLowerCase() === activeFilter.toLowerCase(),
        );
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / limit));

  const pageProjects = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProjects.slice(start, start + limit);
  }, [filteredProjects, page]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  if (page > totalPages) setPage(totalPages);

  return (
    <section className="project-page">
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <header className="project-header">
        <h1 className="dash-title">Projects</h1>
        <p className="dash-subtitle">
          Overview of your current and past projects.
        </p>
      </header>

      <div className="project-surface">
        <div className="project-surface-header">
          <span>Current projects</span>
        </div>

        <div className="project-filters">
          {["All", "Active", "Completed", "In Progress"].map((filter) => (
            <button
              key={filter}
              className={`project-filter dash-btn ghost ${
                activeFilter === filter ? "is-active" : ""
              }`}
              onClick={() => handleFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="project-list-wrap">
          {pageProjects.length === 0 ? (
            <div className="project-empty">No projects found.</div>
          ) : (
            <div className="project-list">
              {pageProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onClick={(p) => setSelected(p)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="project-pagination">
          <button
            className="dash-btn ghost"
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>

          <span className="dash-item-meta project-page-meta">
            Page {page} of {totalPages}
          </span>

          <button
            className="dash-btn ghost"
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
