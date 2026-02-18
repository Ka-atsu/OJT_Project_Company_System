import React from "react";
import "./project.css";
import ProjectModal from "./ProjectModal";
import {
  getStatusClass,
  projectFilters,
  useClientProjects,
} from "./useClientProject";

function capitalize(str) {
  if (!str) return "";

  // Handle special cases
  if (str.toLowerCase() === "on_hold") return "On Hold";

  // Default behavior: capitalize first letter
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function ProjectRow({ project, onClick }) {
  const statusClass = getStatusClass(project.status);

  // Log the project status to verify it's correct
  console.log("Project Status:", project.status);

  return (
    <button
      type="button"
      className="project-row project-row-btn"
      onClick={() => onClick(project)}
    >
      <div className="project-main">
        <div className="project-meta">
          <span className="dash-icon">🏠</span>
          <div className="project-text">
            <h6 className="project-title">{project.name}</h6>
            <p className="project-subtitle">{project.type}</p>
          </div>
        </div>
      </div>

      <div className={`project-status ${statusClass}`}>
        {capitalize(project.status)} {/* Capitalizes "on_hold" -> "On Hold" */}
      </div>
    </button>
  );
}

export default function ClientProject() {
  const {
    activeFilter,
    page,
    totalPages,
    loading,
    err,
    pageProjects,
    selected,
    setSelected,
    handleFilter,
    prevPage,
    nextPage,
  } = useClientProjects({ limit: 6 });

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
          {/* Use the `projectFilters` for filter buttons */}
          {projectFilters.map((status) => (
            <button
              key={status}
              className={`project-filter dash-btn ghost ${
                activeFilter === status ? "is-active" : ""
              }`}
              onClick={() => handleFilter(status)}
              type="button"
            >
              {status} {/* Directly use the filter name */}
            </button>
          ))}
        </div>

        <div className="project-list-wrap">
          {loading ? (
            <div className="project-empty">Loading projects…</div>
          ) : err ? (
            <div className="project-empty">Error: {err}</div>
          ) : pageProjects.length === 0 ? (
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
            onClick={prevPage}
            disabled={page <= 1 || loading}
          >
            Prev
          </button>

          <span className="dash-item-meta project-page-meta">
            Page {page} of {totalPages}
          </span>

          <button
            className="dash-btn ghost"
            type="button"
            onClick={nextPage}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
