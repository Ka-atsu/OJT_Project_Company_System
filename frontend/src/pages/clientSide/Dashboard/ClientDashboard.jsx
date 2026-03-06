import "./dashboard.page.css";
import { useNavigate } from "react-router-dom";
import { useClientDashboard } from "./useClientDashboard";
import "../globalClient.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";
import { FiInfo } from "react-icons/fi";
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
            <div className="dash-surface dash-stat dash-stat-active">
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
            <div className="dash-surface-top">
              <div className="dash-surface-header">Next appointment</div>
              <button
                className="dash-view-all"
                onClick={() => navigate("/dashboard/appointments")}
              >
                View all appointments ▸
              </button>
            </div>
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
                  <div className="dash-appointment-left">
                    <FaRegCalendarAlt className="dash-appointment-icon" />

                    <div>
                      <div className="dash-item-title">
                        {appointment.date} · {appointment.time}
                      </div>
                      <div className="dash-item-meta">
                        {appointment.project} · {appointment.purpose}
                      </div>
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
          </div>

          {/* PROJECTS */}
          <div className="dash-surface">
             <div className="dash-surface-top">
              <div className="dash-surface-header">Projects overview</div>
              <button
                className="dash-view-all"
                onClick={() => navigate("/dashboard/projects")}
              >
                View all projects ▸
              </button>
             </div>
             
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
                      <div className="dash-project-left">
                        <LuFolderKanban className="dash-project-icon" />
                        <span className="dash-project-name">
                          {project.name}
                        </span>
                      </div>

                      <span className={`dash-status ${project.status}`}>
                        {capitalize(project.status)}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-col">
          {/* ALERTS */}
          <div className="dash-surface dash-surface-alerts">
            <div className="dash-surface-header">Alerts</div>

            <div className="dash-list">
              {alerts === null ? (
                // SKELETON WHILE LOADING
                [...Array(3)].map((_, i) => (
                  <div key={i} className="dash-item-meta dash-appointment-left">
                    <div className="skeleton dash-project-name-skeleton"></div>
                  </div>
                ))
              ) : alerts.length === 0 ? (
                // EMPTY STATE (ONLY AFTER LOADING)
                <div className="dash-item-meta dash-appointment-left">
                  <FiInfo className="dash-alert-icon" />
                  <span>No alerts right now.</span>
                </div>
              ) : (
                // ALERTS
                alerts.map((msg, i) => (
                  <div key={i} className="dash-item-meta dash-appointment-left">
                    <FiInfo className="dash-alert-icon" />
                    <span>{msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="dash-surface">
            <div className="dash-surface-top">
              <div className="dash-surface-header">Recent documents</div>
              <button
                className="dash-view-all"
                onClick={() => navigate("/dashboard/documents")}
              >
                View all documents ▸
              </button>
            </div>
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
                      <div className="dash-doc-left">
                        <div className="docs-badge">PDF</div>
                        <span className="dash-doc-name">{d.name}</span>
                      </div>

                      <button
                        className="dash-doc-action"
                        onClick={() => window.open(d.fileUrl, "_blank")}
                      >
                        Download
                      </button>
                    </div>
                  ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
