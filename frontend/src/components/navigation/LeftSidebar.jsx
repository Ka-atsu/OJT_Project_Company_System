import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaFolderOpen, FaFileAlt, FaCalendarAlt } from "react-icons/fa"; 

export default function LeftSidebar() {
  const navigate = useNavigate();
  
  // This is the function for clientside quickaction not yet settled for admin quickaction
  const handleScheduleAppointment = () => {
    navigate("/dashboard/appointments?openModal=true");
  };
  const handleViewProjects = () => {
    navigate("/dashboard/projects");
  };


  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-inner">
        {/* Primary Nav */}
        <nav className="dash-nav">
          <NavLink to="/dashboard" end className="dash-link">
            <span className="dash-icon"><FaHome /></span>
            <span>Dashboard</span>
          </NavLink>

          <div className="dash-group">
            <NavLink to="/dashboard/projects" className="dash-link">
              <span className="dash-icon"><FaFolderOpen /></span>
              <span>Projects</span>
            </NavLink>

            <NavLink to="/dashboard/documents" className="dash-link">
              <span className="dash-icon"><FaFileAlt /></span>
              <span>Documents</span>
            </NavLink>

            <NavLink to="/dashboard/appointments" className="dash-link">
              <span className="dash-icon"><FaCalendarAlt /></span>
              <span>Appointments</span>
            </NavLink>
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="dash-card">
          <span className="dash-card-title">Quick actions</span>

          <button
            className="dash-btn primary"
            onClick={handleScheduleAppointment}
          >
            Schedule appointment
          </button>

          <button
            className="dash-btn ghost"
            onClick={handleViewProjects}
          >
            View all projects
          </button>
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
