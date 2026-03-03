import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import "../global.css";

export default function ClientRoute() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="spinner-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin trying to access client pages
  if (user.is_admin) {
    return <Navigate to="/admin" replace />;
  }

  // Valid client
  return <Outlet />;
}
