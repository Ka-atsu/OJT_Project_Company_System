import { useState } from "react";
import "../../css/Client/project.css";

function ProjectCard({ project }) {
  // Map status to class
  const statusClass =
    project.status.toLowerCase().replace(" ", "-"); // e.g., "In Progress" => "in-progress"

  return (
    <div className="project-item card">
      <div className="project-left">
        <div className="project-icon">🏢</div>

        <div className="project-text">
          <h6>{project.name}</h6>
          <small>{project.type}</small>
        </div>
      </div>

      <div className={`project-status ${statusClass}`}>{project.status}</div>
      <></>
      
    </div>
  );
}

const projects = [
  { id: 1, name: "Random Building Somewhere", type: "Commercial Building", status: "In Progress" },
  { id: 2, name: "2nd Random Building Somewhere", type: "Commercial Building", status: "Completed" },
  { id: 3, name: "3rd Random Building Somewhere", type: "Commercial Building", status: "Active" },
  { id: 4, name: "4th Building", type: "Residential", status: "In Progress" },
  { id: 5, name: "5th Building", type: "Residential", status: "Completed" },
  { id: 6, name: "6th Building", type: "Commercial", status: "Active" },
  { id: 7, name: "7th Building", type: "Commercial", status: "In Progress" },
];

export default function ClientProject() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) => p.status.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section className="dash-content">
      <div className="mb-4">
        <h2 className="dash-title">Projects</h2>
        <p className="dash-subtitle">Overview of all projects or something</p>
      </div>

      <div className="project-container">
        {/* Header */}
        <div className="project-section-header">
          <span className="section-icon">🔖</span>
          <h5>Current Projects</h5>
        </div>

        {/* Filters */}
        <div className="project-filters centered">
          {["All", "Active", "Completed", "In Progress"].map((filter) => (
            <button
              key={filter}
              className={`filter ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="project-list">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Pagination */}
        <div className="project-pagination">
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <span>…</span>
          <button className="page">67</button>
          <button className="page">68</button>
        </div>
      </div>
    </section>
  );
}
