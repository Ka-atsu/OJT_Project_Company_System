import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import PreloaderVideo from "../animation/PreloaderVideo";

export default function ClientRoute() {
  const { user, loading } = useAuthUser();

  if (loading) {
    return <PreloaderVideo durationMs={60000} />;
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
