import { NavLink } from "react-router-dom";

export default function DashboardTopNav() {
  return (
    <header className="dash-topnav">
      <div className="dash-topnav-inner">
        {/* Brand */}
        <div className="dash-brand">
          <img src="/logo.png" alt="Cliberduche" height="32" />
          <span className="dash-brand-text">
            Cliberduche <span>Corporation</span>
          </span>
        </div>

        {/* Actions */}
        <div className="dash-actions">
          <NavLink to="/profile" className="dash-link">
            My account
          </NavLink>

          <button className="dash-logout">Logout</button>
        </div>
      </div>
    </header>
  );
}
  