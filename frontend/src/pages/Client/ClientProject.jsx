
import "../../css/Client/project.css";

export default function ClientProject() {
  return (
    <section className="dash-content">
      {/* Page Title */}
      <div className="mb-4">
        <h2 className="dash-title">Projects</h2>
        <p className="dash-subtitle">
          Overview of all projects assigned to you.
        </p>
      </div>

      {/* Projects Container */}
      <div className="project-container">
        {/* Header + Filters */}
        <div className="project-header">
          <h5>Current Projects</h5>

          <div className="project-filters">
            <button className="filter active">All</button>
            <button className="filter">Active</button>
            <button className="filter">Completed</button>
          </div>
        </div>

        {/* Project List */}
        <div className="project-list">
          <div className="project-item">
            <div className="project-left">
              <div className="project-icon">🏢</div>
              <div>
                <h6 className="project-name">Random Building Somewhere</h6>
                <small>Commercial Building</small>
              </div>
            </div>
            <span className="project-status in-progress">In Progress</span>
          </div>

          <div className="project-item">
            <div className="project-left">
              <div className="project-icon">🏢</div>
              <div>
                <h6 className="project-name">2nd Random Building Somewhere</h6>
                <small>Commercial Building</small>
              </div>
            </div>
            <span className="project-status in-progress">In Progress</span>
          </div>

          <div className="project-item">
            <div className="project-left">
              <div className="project-icon">🏢</div>
              <div>
                <h6 className="project-name">3rd Random Building Somewhere</h6>
                <small>Commercial Building</small>
              </div>
            </div>
            <span className="project-status in-progress">In Progress</span>
          </div>
        </div>

        {/* Pagination */}
        <div className="project-pagination">
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <span>…</span>
          <button className="page">68</button>
        </div>
      </div>
    </section>
  );
}
