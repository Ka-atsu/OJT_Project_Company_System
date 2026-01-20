import { NavLink } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-inner">
        {/* Primary Nav */}
        <nav className="dash-nav">
          <NavLink to="/dashboard" className="dash-link">
            <span className="dash-icon">🏠</span>
            <span>Dashboard</span>
          </NavLink>

          <div className="dash-group">
            <NavLink to="/dashboard/projects" className="dash-link">
              <span className="dash-icon">📁</span>
              <span>Projects</span>
            </NavLink>

            <NavLink to="/dashboard/documents" className="dash-link">
              <span className="dash-icon">📄</span>
              <span>Documents</span>
            </NavLink>

            <NavLink to="/dashboard/appointments" className="dash-link">
              <span className="dash-icon">📅</span>
              <span>Appointments</span>
            </NavLink>
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="dash-card">
          <span className="dash-card-title">Quick actions</span>

          <button className="dash-btn primary">Schedule appointment</button>

          <button className="dash-btn ghost">View all projects</button>
        </div>

        {/* Support */}
        <div className="dash-card subtle">
          <span className="dash-card-title">Support</span>

          <div className="dash-support">
            <div>0900 420 6967</div>
            <div>support@cliberduche.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
