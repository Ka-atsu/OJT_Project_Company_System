import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import "../global.css";

export default function GuestRoute() {
  const { user } = useAuthUser();

  if (user) {
    if (user.is_admin) {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
