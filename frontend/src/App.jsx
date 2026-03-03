import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import HomeEntry from "./pages/animation/HomeEntry";
import About from "./pages/landingPage/About/About";
import Services from "./pages/landingPage/Services/Services";
import Contact from "./pages/landingPage/Contact/Contact";
import Projects from "./pages/landingPage/Projects/Projects";
import NotFound from "./pages/NotFound";

import Auth from "./pages/authentication/Auth";

import ClientDashboard from "./pages/clientSide/Dashboard/ClientDashboard";
import ClientAccountSettings from "./pages/clientSide/AccountSettings/ClientAccountSettings";
import ClientAppointment from "./pages/clientSide/Appointment/ClientAppointment";
import ClientProject from "./pages/clientSide/Project/ClientProject";
import ClientDocuments from "./pages/clientSide/Document/ClientDocuments";
import ClientRoute from "./pages/authentication/ClientRoute";

import AdminAppointments from "./pages/admin/appointment/AdminAppointments";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminProjects from "./pages/admin/project/AdminProjects";
import AdminSettings from "./pages/admin/settings/AdminSettings";
import AdminDocuments from "./pages/admin/document/components/AdminDocuments";
import AdminClientDocuments from "./pages/admin/document/components/AdminClientDocuments";

import AdminRoute from "./pages/authentication/AdminRoute";
import GuestRoute from "./pages/authentication/GuestRoute";

import ScrollManager from "./components/routing/ScrollManager";
import kentTestingRoutes from "./testingRoutes/kentTestingRoutes";
import warlyTestingRoutes from "./testingRoutes/warlyTestingRoutes";
import { useLayoutEffect } from "react";

export function DisableScrollRestoration() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <DisableScrollRestoration />
      <ScrollManager />

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeEntry />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        <Route element={<ClientRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="profile" element={<ClientAccountSettings />} />
            <Route path="appointments" element={<ClientAppointment />} />
            <Route path="documents" element={<ClientDocuments />} />
            <Route path="projects" element={<ClientProject />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route
              path="clientDocuments/:clientId"
              element={<AdminClientDocuments />}
            />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <kentTestingRoutes />
      <warlyTestingRoutes />
    </>
  );
}
