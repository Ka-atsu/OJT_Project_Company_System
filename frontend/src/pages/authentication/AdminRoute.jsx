import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import "../global.css";

export default function AdminRoute() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="spinner-screen">
        <div className="spinner"></div>
        <p>Checking permissions...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!user.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized admin
  return <Outlet />;
}
