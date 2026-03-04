import { useEffect, useState } from "react";
import { listAppointments } from "../Appointment/appointments.service";
import { useClientDocuments } from "../Document/document.service";
import { useClientProjects } from "../Project/useClientProject";

function getStoredName() {
  const raw = localStorage.getItem("user");
  if (!raw) return "";

  try {
    const user = JSON.parse(raw);
    return user?.name || user?.fullName || user?.username || "";
  } catch {
    return "";
  }
}

export function useClientDashboard() {
  const name = getStoredName();

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  const { docs: recentDocs, loading: loadingDocs } = useClientDocuments({
    pageSize: 4,
    page: 1,
  });

  const { pageProjects: recentProjects, loading: loadingProjects } =
    useClientProjects({ limit: 3 });

  const { pageProjects: allProjects = [], loading: loadingAllProjects } =
    useClientProjects({ limit: 1000 });

  const projectStats = {
    active: allProjects.filter((p) => p.status?.toLowerCase() === "active")
      .length,
    completed: allProjects.filter(
      (p) => p.status?.toLowerCase() === "completed",
    ).length,
    onHold: allProjects.filter((p) => p.status?.toLowerCase() === "on_hold")
      .length,
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingAppointments(true);

      try {
        const res = await listAppointments({
          status: "upcoming",
          page: 1,
          limit: 5,
        });

        setAppointments(res.data || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  function capitalize(str) {
    if (!str) return "";

    if (str.toLowerCase() === "on_hold") return "On Hold";

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /* ---------------- ALERTS ---------------- */

  const alerts = [];

  if (appointments.length > 0) {
    const next = appointments[0];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (next.date === tomorrow.toISOString().split("T")[0]) {
      alerts.push("Appointment scheduled tomorrow");
    }
  }

  if (recentDocs.length > 0) {
    alerts.push(`${recentDocs.length} new document(s) available`);
  }

  const onHoldProject = allProjects.find(
    (p) => p.status.toLowerCase() === "on_hold",
  );

  if (onHoldProject) {
    alerts.push(`Project "${onHoldProject.name}" is on hold`);
  }

  const greeting = name ? `Welcome back, ${name}` : "Welcome back";

  return {
    greeting,
    appointments,
    loadingAppointments,
    recentDocs,
    loadingDocs,
    recentProjects,
    loadingProjects,
    loadingAllProjects,
    projectStats,
    alerts,
    capitalize,
  };
}
