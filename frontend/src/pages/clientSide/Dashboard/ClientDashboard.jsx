import "./dashboard.page.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listAppointments } from "../Appointment/appointments.service";
import { useClientDocuments } from "../Document/document.service";
import { useClientProjects } from "../Project/useClientProject";

function getStoredName() {
  const raw = localStorage.getItem("user");
  if (!raw) return "";

  try {
    const user = JSON.parse(raw);
    const name = user?.name || user?.fullName || user?.username;
    return name || "";
  } catch {
    return "";
  }
}

const docs = ["Contract Document", "Progress Report", "Planning Files"];

export default function ClientDashboard() {
  const name = getStoredName();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const {
  docs: recentDocs,
  loading: loadingDocs,
  } = useClientDocuments({ pageSize: 4, page: 1 });
  const {
    pageProjects: recentProjects,
    loading: loadingProjects,
  } = useClientProjects({ limit: 3 });
  const { pageProjects: allProjects = [], loading: loadingAllProjects } = useClientProjects({ limit: 1000 });

  const projectStats = {
  active: allProjects.filter(p => p.status.toLowerCase() === "active").length,
  completed: allProjects.filter(p => p.status.toLowerCase() === "completed").length,
  onHold: allProjects.filter(p => p.status.toLowerCase() === "on_hold").length,
  draft: allProjects.filter(p => p.status.toLowerCase() === "draft").length,
};
  

  let greeting = "Welcome back";
  if (name) {
    greeting = `Welcome back, ${name}`;
  }

  useEffect(() => {
  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const res = await listAppointments({ status: "upcoming", page: 1, limit: 5 });
      setAppointments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setAppointments([]);
    } finally {
      setLoadingAppointments(false);
    }
  };

  fetchAppointments();
}, []);

function capitalize(str) {
  if (!str) return "";

  // Handle special cases
  if (str.toLowerCase() === "on_hold") return "On Hold";

  // Default behavior: capitalize first letter
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  return (
    <section className="dash-page dashboard">
      <header className="dash-page-header">
        <h1 className="dash-title">{greeting}</h1>
        <p className="dash-subtitle">
          Here’s what’s happening with your projects today.
        </p>
      </header>

      {/*=============== STATUS ===================*/}
      <div className="dash-stats">
        {loadingAllProjects ? (
          <div>Loading stats…</div>
        ) : (
          <>
            <div className="dash-surface dash-stat">
              <span className="dash-stat-label">Active Projects</span>
              <strong className="dash-stat-value">{projectStats.active}</strong>
            </div>

            <div className="dash-surface dash-stat">
              <span className="dash-stat-label">Completed Projects</span>
              <strong className="dash-stat-value">{projectStats.completed}</strong>
            </div>

            <div className="dash-surface dash-stat">
              <span className="dash-stat-label">On Hold</span>
              <strong className="dash-stat-value">{projectStats.onHold}</strong>
            </div>

            <div className="dash-surface dash-stat">
              <span className="dash-stat-label">Drafts</span>
              <strong className="dash-stat-value">{projectStats.draft}</strong>
            </div>
          </>
        )}
      </div>
      {/*=============== APPOINTMENTS ===================*/}
      <div className="dash-grid">
        <div className="dash-col">
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Next appointment</span>
            </div>

            {loadingAppointments ? (
                  <div>Loading…</div>
                ) : appointments.length === 0 ? (
                  <div>No upcoming appointments</div>
                ) : (
                  <>
                    <div className="dash-list-item">
                      <div>
                        <div className="dash-item-title">
                          {appointments[0].date} · {appointments[0].time}
                        </div>
                        <div className="dash-item-meta">
                          {appointments[0].project} · {appointments[0].purpose}
                        </div>
                      </div>
                      <span
                        className={`dash-status ${
                          appointments[0].approvalStatus === "accepted" ? "success" : "muted"
                        }`}
                      >
                        {appointments[0].approvalStatus === "accepted"
                          ? "Confirmed"
                           : capitalize(appointments[0].approvalStatus)}
                      </span>
                    </div>

                    {appointments.length > 1 && (
                      <div className="dash-item-meta dash-meta-spacer">
                        +{appointments.length - 1} upcoming appointment
                        {appointments.length - 1 > 1 ? "s" : ""}
                      </div>
                    )}
                  </>
                )}

                <button
                  type="button"
                  className="dash-view-all"
                  onClick={() => navigate("/dashboard/appointments")}
                >
                  View all appointments →
                </button>
      {/*=============== ALERTS ===================*/}                
          </div>
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Alerts</span>
            </div>
           <div className="dash-list">
              <div className="dash-item-meta">• 1 document pending review</div>
              <div className="dash-item-meta">
                • Appointment scheduled tomorrow
              </div>
              <div className="dash-item-meta">
                • Project “Random Building” updated
              </div>
          </div>
          </div>
        </div>
      {/*=============== DOCUMENTS ===================*/}
        <div className="dash-col">
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Recent documents</span>
            </div>

            <div className="dash-list">
              {loadingDocs ? (
                <div className="dash-item-meta">Loading documents…</div>
              ) : recentDocs.length === 0 ? (
                <div className="dash-item-meta">No documents found.</div>
              ) : (
                recentDocs.map((d) => (
                  <div key={d.id} className="dash-doc">
                    <span>{d.name}</span>
                    <button
                      type="button"
                      className="dash-doc-action"
                      onClick={() => window.open(d.fileUrl, "_blank")}
                      disabled={!d.fileUrl}
                    >
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              className="dash-view-all"
              onClick={() => navigate("/dashboard/documents")}
            >
              View all documents →
            </button>
          </div>
        </div>
      </div>
      {/*=============== PROJECTS ===================*/}
      <div className="dash-surface">
        <div className="dash-surface-header">
          <span>Projects overview</span>
        </div>

        <div className="dash-projects">
          {loadingProjects ? (
            <div className="dash-item-meta">Loading projects…</div>
          ) : recentProjects.length === 0 ? (
            <div className="dash-item-meta">No projects found.</div>
          ) : (
            recentProjects.map((project) => (
              <div key={project.id} className="dash-project-row">
                <span className="dash-project-name">{project.name}</span>
                <span className={`dash-status ${project.status}`}>
                  {capitalize(project.status)}
                </span>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="dash-view-all"
          onClick={() => navigate("/dashboard/projects")}
        >
          View all projects →
        </button>
      </div>
    </section>
  );
}
