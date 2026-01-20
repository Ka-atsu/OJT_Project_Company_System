import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Safety from "./pages/Safety";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ClientDashboard from "./pages/Client/ClientDashboard";

import warlyTestingRoutes from "./testingRoutes/warlyTestingRoutes";
import kentTestingRoutes from "./testingRoutes/kentTestingRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="safety" element={<Safety />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ClientDashboard />} />
        {/* <Route path="projects" element={<Projects />} />
        <Route path="documents" element={<Documents />} /> */}
      </Route>

      {warlyTestingRoutes()}
      {kentTestingRoutes()}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
