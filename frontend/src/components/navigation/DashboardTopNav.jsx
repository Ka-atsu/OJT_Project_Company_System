import { NavLink, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { logout as logoutReq } from "../../pages/authentication/auth.service";

export default function DashboardTopNav() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = useMemo(() => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}, []);

  const isAdmin = user?.redirectTo?.startsWith("/admin");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutReq();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem("user");
      setLoading(false);
      navigate("/login");
    }
  };

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
          {/* Show ONLY if NOT admin */}
         {!isAdmin && (
            <NavLink to="/dashboard/profile" className="dash-link">
              My account
            </NavLink>
          )}

          <button
            className="dash-logout"
            type="button"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}