import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./pages/landingPage/Home/Home";
import About from "./pages/landingPage/About/About";
import Safety from "./pages/landingPage/Safety/Safety";
import Services from "./pages/landingPage/Services/Services";
import Contact from "./pages/landingPage/Contact/Contact";
import Projects from "./pages/landingPage/Projects/Projects";
import NotFound from "./pages/NotFound";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";

import ClientDashboard from "./pages/clientSide/Dashboard/ClientDashboard";

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
        <Route path="projects" element={<Projects />} />
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
