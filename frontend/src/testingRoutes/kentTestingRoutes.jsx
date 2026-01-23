import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/Client/ClientDashboard";
import Appointment from "../components/client/Appointment";
import ClientAccountSettings from "../pages/Client/ClientAccountSettings";

export default function kentTestingRoutes() {
  return (
    <Route path="/k" element={<DashboardLayout />}>
      <Route index element={<ClientDashboard />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="account" element={<ClientAccountSettings />} />
    </Route>
  );
}
