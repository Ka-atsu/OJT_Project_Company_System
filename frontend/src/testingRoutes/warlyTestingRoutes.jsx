import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/clientSide/Dashboard/ClientDashboard";
import Contact from "../pages/landingPage/Contact/Contact";
import ClientProject from "../pages/clientSide/Project/ClientProject";

export default function warlyTestingRoutes() {
  return (
    <Route path="/warlyTesting" element={<DashboardLayout />}>
      <Route index element={<ClientDashboard />} />
      <Route path="contacts" element={<Contact />} />
      <Route path="contact2" element={<Contact />} />
      <Route path="project" element={<ClientProject />} />
    </Route>
  );
}
