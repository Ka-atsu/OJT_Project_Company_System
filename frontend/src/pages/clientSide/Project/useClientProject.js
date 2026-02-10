import { useEffect, useMemo, useRef, useState } from "react";
import { ClientProjectsService } from "./projects.service";

export const projectFilters = ["All", "Active", "Completed", "In Progress"];

export function useClientProjects({ limit = 6 } = {}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const abortRef = useRef(null);

  const pageProjects = useMemo(() => items, [items]);

  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    ClientProjectsService.list(
      { status: activeFilter, page, limit },
      controller.signal,
    )
      .then((res) => {
        setItems(res.items);
        setTotalPages(res.totalPages);

        // keep page valid if backend totalPages changed
        if (page > res.totalPages) setPage(res.totalPages);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setErr(e?.message ?? "Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [activeFilter, page, limit]);

  function handleFilter(filter) {
    setActiveFilter(filter);
    setPage(1);
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  return {
    // data
    activeFilter,
    page,
    totalPages,
    loading,
    err,
    pageProjects,
    selected,

    // actions
    setSelected,
    handleFilter,
    prevPage,
    nextPage,
  };
}

export function getStatusClass(status) {
  return String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}
