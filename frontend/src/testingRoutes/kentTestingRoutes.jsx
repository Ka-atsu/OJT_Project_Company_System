import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/clientSide/Dashboard/ClientDashboard";
import Appointment from "../pages/clientSide/Appointment/Appointment";
import ClientAccountSettings from "../pages/clientSide/AccountSettings/ClientAccountSettings";
import AdminAppointments from "../pages/admin/appointment/AdminAppointments";
import AdminProjects from "../pages/admin/project/AdminProjects";
import AdminSettings from "../pages/admin/settings/AdminSettings";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

export default function kentTestingRoutes() {
  return (
    <Route path="/k" element={<DashboardLayout />}>
      <Route index element={<ClientDashboard />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="account" element={<ClientAccountSettings />} />
      <Route path="appointment2" element={<AdminAppointments />} />
      <Route path="projects2" element={<AdminProjects />} />
      <Route path="settings2" element={<AdminSettings />} />
      <Route path="admindash" element={<AdminDashboard />} />
    </Route>
  );
}
