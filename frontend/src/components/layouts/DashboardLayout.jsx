import { Outlet } from "react-router-dom";
import DashboardTopNav from "../DashboardTopNav";
import LeftSidebar from "../LeftSidebar";
import "../../css/indexClient.css";

export default function DashboardLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Dashboard Top Nav */}
      <DashboardTopNav />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <LeftSidebar />

        {/* Main Content */}
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
