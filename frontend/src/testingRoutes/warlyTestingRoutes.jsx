import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/Client/ClientDashboard";

export default function warlyTestingRoutes() {
  return (
    <Route path="/warlyTesting" element={<DashboardLayout />}>
      <Route index element={<ClientDashboard />} />
    </Route>
  );
}
