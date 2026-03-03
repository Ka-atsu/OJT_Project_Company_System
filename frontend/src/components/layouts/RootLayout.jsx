import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();

  // Keep this as is, but ensure it's not conflicting with HomeEntry
  useLayoutEffect(() => {
    // Only scroll to top if we aren't currently showing the intro
    // (HomeEntry handles its own scroll-to-top after the intro)
    if (window.location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet key={pathname} />
      </main>
      <Footer />
    </div>
  );
}
