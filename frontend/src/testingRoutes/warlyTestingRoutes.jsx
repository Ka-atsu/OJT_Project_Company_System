import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/Client/ClientDashboard";
import Contact from "../pages/Contact";

export default function warlyTestingRoutes() {
  return (
    <Route path="/warlyTesting" element={<DashboardLayout />}>
      <Route index element={<ClientDashboard />} />
      <Route path="contacts" element={<Contact />} />
      <Route path="contact2" element={<Contact />} />
    </Route>
  );
}
