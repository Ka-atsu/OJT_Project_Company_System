import "./dashboard.page.css";

export default function ClientDashboard() {
  return (
    <section className="dash-page dashboard">
      {/* Header */}
      <header className="dash-page-header">
        <h1 className="dash-title">Welcome back, Alex</h1>
        <p className="dash-subtitle">
          Here’s what’s happening with your projects today.
        </p>
      </header>

      {/* STATS ROW */}
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

      {/* MAIN GRID */}
      <div className="dash-grid">
        {/* LEFT COLUMN */}
        <div className="dash-col">
          {/* NEXT APPOINTMENT */}
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

            <div className="dash-item-meta" style={{ marginTop: "0.75rem" }}>
              +1 upcoming appointment
            </div>
          </div>

          {/* ALERTS */}
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

        {/* RIGHT COLUMN */}
        <div className="dash-col">
          {/* RECENT DOCUMENTS */}
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Recent documents</span>
            </div>

            <div className="dash-list">
              {["Contract Document", "Progress Report", "Planning Files"].map(
                (doc, i) => (
                  <div key={i} className="dash-doc">
                    <span>{doc}</span>
                    <button className="dash-doc-action">Download</button>
                  </div>
                ),
              )}
            </div>

            <div className="dash-item-meta" style={{ marginTop: "0.75rem" }}>
              View all documents →
            </div>
          </div>
        </div>
      </div>
      {/* PROJECTS SNAPSHOT */}
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

        <div className="dash-item-meta" style={{ marginTop: "0.75rem" }}>
          View all projects →
        </div>
      </div>
    </section>
  );
}
