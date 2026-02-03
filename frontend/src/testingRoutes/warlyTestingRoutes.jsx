import { Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ClientDashboard from "../pages/clientSide/Dashboard/ClientDashboard";
import Contact from "../pages/landingPage/Contact/Contact";
import ClientProject from "../pages/clientSide/Project/ClientProject";
import AdminDocuments  from "../pages/admin/document/adminDocument";
import ClientDocuments from "../pages/admin/document/admin-client_document";

export default function warlyTestingRoutes() {
  return (
    <Route path="/w" element={<DashboardLayout />}>
      
      <Route index element={<ClientDashboard />} />
      <Route path="project" element={<ClientProject />} />
      <Route path = "admin/document" element = {<AdminDocuments />} />
      <Route path = "admin/clientDocuments/:clientId" element = {<ClientDocuments/>} />

    </Route>
  );
}
