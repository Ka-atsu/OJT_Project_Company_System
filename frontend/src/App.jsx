import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import HomeEntry from "./pages/animation/HomeEntry";
import About from "./pages/landingPage/About/About";
import Safety from "./pages/landingPage/Safety/Safety";
import Services from "./pages/landingPage/Services/Services";
import Contact from "./pages/landingPage/Contact/Contact";
import Projects from "./pages/landingPage/Projects/Projects";
import NotFound from "./pages/NotFound";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";

import ClientDashboard from "./pages/clientSide/Dashboard/ClientDashboard";
import ClientAccountSettings from "./pages/clientSide/AccountSettings/ClientAccountSettings";

import warlyTestingRoutes from "./testingRoutes/warlyTestingRoutes";
import kentTestingRoutes from "./testingRoutes/kentTestingRoutes";

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function DisableScrollRestoration() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return null;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Hash navigation: scroll to the element with fixed-nav offset
    if (hash) {
      let tries = 0;

      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          const nav = document.querySelector(".site-nav");
          const navH = nav?.offsetHeight ?? 72;

          const top =
            el.getBoundingClientRect().top + window.scrollY - (navH + 16);

          window.scrollTo({ top, behavior: "smooth" });
          return;
        }

        if (tries++ < 60) requestAnimationFrame(tryScroll);
      };

      requestAnimationFrame(tryScroll);
      return;
    }

    // No hash => normal route change => scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

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

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="profile" element={<ClientAccountSettings />} />
        </Route>

        {warlyTestingRoutes()}
        {kentTestingRoutes()}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
