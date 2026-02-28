import { Navigate } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import "./AdminRoute.css";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="admin-route-loading">
        <div className="admin-route-spinner"></div>
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (!user || !user.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
