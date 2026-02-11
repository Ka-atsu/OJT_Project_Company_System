import "./dashboard.page.css";
import { useNavigate } from "react-router-dom";

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

  let greeting = "Welcome back";
  if (name) {
    greeting = `Welcome back, ${name}`;
  }

  return (
    <section className="dash-page dashboard">
      <header className="dash-page-header">
        <h1 className="dash-title">{greeting}</h1>
        <p className="dash-subtitle">
          Here’s what’s happening with your projects today.
        </p>
      </header>

      <div className="dash-stats">
        <div className="dash-surface dash-stat">
          <span className="dash-stat-label">Active Projects</span>
          <strong className="dash-stat-value">4</strong>
        </div>

        <div className="dash-surface dash-stat">
          <span className="dash-stat-label">Completed</span>
          <strong className="dash-stat-value">12</strong>
        </div>

        <div className="dash-surface dash-stat">
          <span className="dash-stat-label">Delayed</span>
          <strong className="dash-stat-value">1</strong>
        </div>

        <div className="dash-surface dash-stat">
          <span className="dash-stat-label">Upcoming</span>
          <strong className="dash-stat-value">2</strong>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-col">
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Next appointment</span>
            </div>

            <div className="dash-list-item">
              <div>
                <div className="dash-item-title">Jan 21, 2026 · 2:00 PM</div>
                <div className="dash-item-meta">
                  Random Building · Contract Review
                </div>
              </div>

              <span className="dash-status success">Confirmed</span>
            </div>

            <div className="dash-item-meta dash-meta-spacer">
              +1 upcoming appointment
            </div>
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

        <div className="dash-col">
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Recent documents</span>
            </div>

            <div className="dash-list">
              {docs.map((doc) => (
                <div key={doc} className="dash-doc">
                  <span>{doc}</span>
                  <button type="button" className="dash-doc-action">
                    Download
                  </button>
                </div>
              ))}
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

      <div className="dash-surface">
        <div className="dash-surface-header">
          <span>Projects overview</span>
        </div>

        <div className="dash-projects">
          <div className="dash-project-row">
            <span className="dash-project-name">Random Building</span>
            <span className="dash-status active">In progress</span>
          </div>

          <div className="dash-project-row">
            <span className="dash-project-name">Office Extension</span>
            <span className="dash-status success">Completed</span>
          </div>

          <div className="dash-project-row">
            <span className="dash-project-name">Warehouse Site</span>
            <span className="dash-status muted">Delayed</span>
          </div>
        </div>

        <div className="dash-item-meta dash-meta-spacer">
          View all projects →
        </div>
      </div>
    </section>
  );
}
