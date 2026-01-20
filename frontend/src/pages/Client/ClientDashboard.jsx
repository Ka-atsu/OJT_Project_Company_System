export default function ClientDashboard() {
  return (
    <section className="dash-page">
      {/* Header */}
      <header className="dash-page-header">
        <h1 className="dash-title">Welcome back</h1>
        <p className="dash-subtitle">
          Here’s what’s happening with your projects and appointments.
        </p>
      </header>

      <div className="dash-grid">
        {/* LEFT COLUMN */}
        <div className="dash-col">
          {/* Upcoming Appointments */}
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Upcoming appointments</span>
            </div>

            <div className="dash-list">
              <div className="dash-list-item">
                <div>
                  <div className="dash-item-title">Jan 21, 2026 · 2:00 PM</div>
                  <div className="dash-item-meta">
                    Cliberduche Office · Onsite
                  </div>
                </div>
                <span className="dash-status success">Confirmed</span>
              </div>

              <div className="dash-divider" />

              <div className="dash-list-item">
                <div>
                  <div className="dash-item-title">Feb 25, 2026 · 2:00 PM</div>
                  <div className="dash-item-meta">Progress Review</div>
                </div>
                <span className="dash-status muted">Scheduled</span>
              </div>
            </div>

            <div className="dash-pagination">1 · 2 · 3 · … · 67 · 68</div>
          </div>

          {/* Current Projects */}
          <div className="dash-surface">
            <div className="dash-surface-header">
              <span>Current projects</span>
            </div>

            <div className="dash-list-item">
              <div className="dash-project">
                <div className="dash-project-icon">🏢</div>
                <div>
                  <div className="dash-item-title">
                    Random Building Somewhere
                  </div>
                  <div className="dash-item-meta">Commercial building</div>
                </div>
              </div>

              <span className="dash-status active">In progress</span>
            </div>

            <div className="dash-pagination">1 · 2 · 3 · … · 67 · 68</div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dash-col">
          <div className="dash-surface full">
            <div className="dash-surface-header">
              <span>Documents</span>
            </div>

            <div className="dash-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="dash-doc">
                  <span>Project document #{i + 1}</span>
                  <button className="dash-doc-action">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
