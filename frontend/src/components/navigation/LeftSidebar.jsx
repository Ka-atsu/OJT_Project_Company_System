import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFolderOpen,
  FaFileAlt,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";
import useAuthUser from "../../pages/authentication/useAuthUser";

export default function LeftSidebar() {
  const navigate = useNavigate();

  const { user, loading } = useAuthUser();

  const isAdmin = user?.is_admin;

  const handleScheduleAppointment = () => {
    if (isAdmin) {
      navigate("/admin/appointments");
    } else {
      navigate("/dashboard/appointments?openModal=true");
    }
  };

  if (loading) return null; // Prevent flicker while loading user

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-inner">
        {/* Primary Nav */}
        <nav className="dash-nav">
          {/* Dashboard Link */}
          <NavLink
            to={isAdmin ? "/admin" : "/dashboard"}
            end
            className="dash-link"
          >
            <span className="dash-icon">
              <FaHome />
            </span>
            <span>{isAdmin ? "Admin Dashboard" : "Dashboard"}</span>
          </NavLink>

          <div className="dash-group">
            {isAdmin ? (
              <>
                {/* ADMIN NAVIGATION */}
                <NavLink to="/admin/projects" className="dash-link">
                  <span className="dash-icon">
                    <FaFolderOpen />
                  </span>
                  <span>Manage Projects</span>
                </NavLink>

                <NavLink to="/admin/documents" className="dash-link">
                  <span className="dash-icon">
                    <FaFileAlt />
                  </span>
                  <span>Manage Documents</span>
                </NavLink>

                <NavLink to="/admin/appointments" className="dash-link">
                  <span className="dash-icon">
                    <FaCalendarAlt />
                  </span>
                  <span>Manage Appointments</span>
                </NavLink>

                <NavLink to="/admin/settings" className="dash-link">
                  <span className="dash-icon">
                    <FaUserShield />
                  </span>
                  <span>Settings</span>
                </NavLink>
              </>
            ) : (
              <>
                {/* CLIENT NAVIGATION */}
                <NavLink to="/dashboard/projects" className="dash-link">
                  <span className="dash-icon">
                    <FaFolderOpen />
                  </span>
                  <span>Projects</span>
                </NavLink>

                <NavLink to="/dashboard/documents" className="dash-link">
                  <span className="dash-icon">
                    <FaFileAlt />
                  </span>
                  <span>Documents</span>
                </NavLink>

                <NavLink to="/dashboard/appointments" className="dash-link">
                  <span className="dash-icon">
                    <FaCalendarAlt />
                  </span>
                  <span>Appointments</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Quick Actions (Clients only) */}
        {!isAdmin && (
          <div className="dash-card">
            <span className="dash-card-title">Quick action</span>

            <button
              className="dash-btn primary"
              onClick={handleScheduleAppointment}
            >
              Schedule appointment
            </button>
          </div>
        )}

        {/* Support (Clients only) */}
        {!isAdmin && (
          <div className="dash-card subtle">
            <span className="dash-card-title">Support</span>

            <div className="dash-support">
              <div>0900 420 6967</div>
              <div>support@cliberduche.com</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
