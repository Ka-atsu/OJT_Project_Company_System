import "./dashboard.page.css";
import { useNavigate } from "react-router-dom";
import { useClientDashboard } from "./useClientDashboard";
import "../globalClient.css";

export default function ClientDashboard() {
  const navigate = useNavigate();

  const {
    greeting,
    appointments,
    loadingAppointments,
    recentDocs,
    loadingDocs,
    recentProjects,
    loadingProjects,
    loadingAllProjects,
    projectStats,
    alerts,
    capitalize,
  } = useClientDashboard();

  return (
    <section className="dash-page dashboard">
      {/* HERO */}
      <header className="dash-hero">
        <h1 className="dash-title">{greeting}</h1>
        <p className="dash-subtitle">
          Here’s an overview of your current projects, documents, and
          appointments.
        </p>
      </header>

      {/* STATS */}
      <div className="dash-stats">
        {loadingAllProjects ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="dash-surface dash-stat">
              <div className="skeleton dash-stat-label-skeleton"></div>
              <div className="skeleton dash-stat-value-skeleton"></div>
            </div>
          ))
        ) : (
          <>
            <div className="dash-surface dash-stat">
              <div className="dash-stat-row">
                <span className="dash-stat-label">Active Projects</span>
                <strong className="dash-stat-value">
                  {projectStats.active}
                </strong>
              </div>
            </div>

            <div className="dash-surface dash-stat">
              <div className="dash-stat-row">
                <span className="dash-stat-label">Completed Projects</span>
                <strong className="dash-stat-value">
                  {projectStats.completed}
                </strong>
              </div>
            </div>

            <div className="dash-surface dash-stat">
              <div className="dash-stat-row">
                <span className="dash-stat-label">On Hold</span>
                <strong className="dash-stat-value">
                  {projectStats.onHold}
                </strong>
              </div>
            </div>
          </>
        )}
      </div>

      {/* GRID */}
      <div className="dash-grid">
        {/* LEFT */}
        <div className="dash-col">
          <div className="dash-surface">
            <div className="dash-surface-header">Next appointment</div>

            {loadingAppointments ? (
              <div className="dash-list-item">
                <div>
                  <div className="skeleton dash-title-skeleton"></div>
                  <div className="skeleton dash-meta-skeleton"></div>
                </div>
                <div className="skeleton dash-badge-skeleton"></div>
              </div>
            ) : appointments.length === 0 ? (
              <div>No upcoming appointments</div>
            ) : (
              appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="dash-list-item">
                  <div>
                    <div className="dash-item-title">
                      {appointment.date} · {appointment.time}
                    </div>
                    <div className="dash-item-meta">
                      {appointment.project} · {appointment.purpose}
                    </div>
                  </div>

                  <span className={`dash-status ${appointment.approvalStatus}`}>
                    {appointment.approvalStatus === "accepted"
                      ? "Confirmed"
                      : capitalize(appointment.approvalStatus)}
                  </span>
                </div>
              ))
            )}

            <button
              className="dash-view-all"
              onClick={() => navigate("/dashboard/appointments")}
            >
              View all appointments →
            </button>
          </div>

          {/* PROJECTS */}
          <div className="dash-surface">
            <div className="dash-surface-header">Projects overview</div>

            <div className="dash-projects">
              {loadingProjects
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="dash-project-row">
                      <div className="skeleton dash-project-name-skeleton"></div>
                      <div className="skeleton dash-badge-skeleton"></div>
                    </div>
                  ))
                : recentProjects.map((project) => (
                    <div key={project.id} className="dash-project-row">
                      <span className="dash-project-name">{project.name}</span>
                      <span className={`dash-status ${project.status}`}>
                        {capitalize(project.status)}
                      </span>
                    </div>
                  ))}
            </div>

            <button
              className="dash-view-all"
              onClick={() => navigate("/dashboard/projects")}
            >
              View all projects →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-col">
          {/* DOCUMENTS */}
          <div className="dash-surface">
            <div className="dash-surface-header">Recent documents</div>

            <div className="dash-list">
              {loadingDocs
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="dash-doc">
                      <div className="skeleton dash-doc-name-skeleton"></div>
                      <div className="skeleton dash-doc-btn-skeleton"></div>
                    </div>
                  ))
                : recentDocs.map((d) => (
                    <div key={d.id} className="dash-doc">
                      <span>{d.name}</span>
                      <button
                        className="dash-doc-action"
                        onClick={() => window.open(d.fileUrl, "_blank")}
                      >
                        Download
                      </button>
                    </div>
                  ))}
            </div>

            <button
              className="dash-view-all"
              onClick={() => navigate("/dashboard/documents")}
            >
              View all documents →
            </button>
          </div>

          {/* ALERTS */}
          <div className="dash-surface">
            <div className="dash-surface-header">Alerts</div>

            <div className="dash-list">
              {alerts.length === 0 ? (
                <div className="dash-item-meta">No alerts right now.</div>
              ) : (
                alerts.map((msg, i) => (
                  <div key={i} className="dash-item-meta">
                    • {msg}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
