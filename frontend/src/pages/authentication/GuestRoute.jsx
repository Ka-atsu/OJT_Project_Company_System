import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser"; 
import "../global.css";

export default function GuestRoute() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="spinner-screen">
        <div className="spinner"></div>
        <p>Checking session...</p>
      </div>
    );
  }

  // Already logged in
  if (user) {
    if (user.is_admin) {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in → allow access
  return <Outlet />;
}
