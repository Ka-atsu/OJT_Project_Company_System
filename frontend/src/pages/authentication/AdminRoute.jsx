import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import PreloaderVideo from "../animation/PreloaderVideo";

export default function AdminRoute() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return <PreloaderVideo durationMs={60000} />;
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
