import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();

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
