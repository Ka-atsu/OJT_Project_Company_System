// src/pages/admin/dashboard/useAdminDashboard.js
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { adminGetDashboard } from "./adminDashboard.service";

export function useAdminDashboard() {
  const [data, setData] = useState({
    kpis: { pendingCount: 0, activeCount: 0, docsNew: 0, milestonesDue: 0 },
    appointments: [],
    projects: [],
    documents: [],
    activity: [],
  });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const requestIdRef = useRef(0);

  const refresh = useCallback((params) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setErr("");

    adminGetDashboard(params)
      .then((d) => {
        if (requestId !== requestIdRef.current) return;
        setData(d);
      })
      .catch((e) => {
        if (
          axios.isCancel?.(e) ||
          e.code === "ERR_CANCELED" ||
          e.message === "canceled"
        )
          return;

        if (requestId !== requestIdRef.current) return;

        setErr(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load dashboard",
        );
      })
      .finally(() => {
        if (requestId === requestIdRef.current) setLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, err, refresh };
}
