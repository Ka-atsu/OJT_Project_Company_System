import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectsService } from "./projects.services";
import { useSearchParams } from "react-router-dom";

/* =========================
   Helpers
========================= */

function calcProgress(milestones = []) {
  if (!milestones.length) return 0;
  const done = milestones.filter((m) => m.status === "done").length;
  return Math.round((done / milestones.length) * 100);
}

export function emptyProject() {
  return {
    name: "",
    clientId: "",
    clientName: "",
    startDate: "",
    dueDate: "",
    status: "active",
    milestones: [],
    photos: [],
    progress: 0,
    showcase: false,
  };
}

/* =========================
   Hook
========================= */

export default function useAdminProjects() {
  /* ---------- URL State ---------- */

  const [searchParams, setSearchParams] = useSearchParams();
  const selectParam = searchParams.get("select");

  /* ---------- State ---------- */

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState(null); // null = not loaded yet
  const [loading, setLoading] = useState(true); // start true for first load
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState("active");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due_asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const [err, setErr] = useState("");

  const [selectedId, setSelectedId] = useState(
    selectParam ? Number(selectParam) : null,
  );

  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState(emptyProject());

  const [clientQuery, setClientQuery] = useState("");

  const abortRef = useRef(null);

  /* ---------- Derived ---------- */

  const selected = useMemo(() => {
    if (!items) return null;
    return items.find((x) => x.id === selectedId) ?? null;
  }, [items, selectedId]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(total, page * pageSize);

  const filteredClients = useMemo(() => {
    if (!clientQuery.trim()) return clients;
    const query = clientQuery.toLowerCase();
    return clients.filter(
      (c) =>
        c.name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query),
    );
  }, [clients, clientQuery]);

  /* =========================
     Effects
  ========================= */

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, q, sort, pageSize]);

  // Sync URL → selectedId
  useEffect(() => {
    if (selectParam) {
      setSelectedId(Number(selectParam));
      setStatus("all");
    }
  }, [selectParam]);

  // Fetch selected project directly (fix deep-link + pagination issue)
  useEffect(() => {
    if (!selectParam) return;

    async function loadSelectedProject() {
      try {
        const project = await ProjectsService.get(selectParam);

        setSelectedId(project.id);

        // Inject into list if not already present
        setItems((prev) => {
          if (!prev) return [project];
          const exists = prev.find((p) => p.id === project.id);
          if (exists) return prev;
          return [project, ...prev];
        });
      } catch (e) {
        console.error("Failed to load selected project");
      }
    }

    loadSelectedProject();
  }, [selectParam]);

  // Fetch clients
  useEffect(() => {
    const controller = new AbortController();

    async function loadClients() {
      try {
        const data = await ProjectsService.clients(controller.signal);
        setClients(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErr("Failed to load clients");
        }
      }
    }

    loadClients();
    return () => controller.abort();
  }, []);

  // Fetch projects
  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    const effectiveStatus = selectParam ? "all" : status;

    ProjectsService.list(
      {
        page,
        limit: pageSize,
        status: effectiveStatus,
        q,
        sort,
      },
      controller.signal,
    )
      .then(({ items: nextItems, total: nextTotal }) => {
        setItems(nextItems ?? []);
        setTotal(nextTotal);

        if (!isCreating) {
          if (selectParam) {
            const exists = nextItems.find((p) => p.id === Number(selectParam));

            if (exists) {
              setSelectedId(Number(selectParam));
              return;
            }
          }

          if (!selectedId && nextItems.length > 0) {
            setSelectedId(nextItems[0].id);
          }
        }
      })
      .catch((e) => {
        if (e.name === "AbortError" || e.code === "ERR_CANCELED") {
          return;
        }

        setErr("Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, pageSize, status, q, sort, isCreating, selectParam]);

  // Sync draft when selecting
  useEffect(() => {
    if (!selected || isCreating) return;

    const milestones = selected.milestones ?? [];

    setDraft({
      ...selected,
      budget: String(selected.budget ?? ""),
      milestones,
      progress: calcProgress(milestones),
      photos: [],
    });

    setClientQuery("");
  }, [selected, isCreating]);

  /* =========================
     Actions
  ========================= */

  const startCreate = () => {
    setIsCreating(true);
    setSelectedId(null);
    setDraft(emptyProject());
  };

  const cancelCreate = () => {
    setIsCreating(false);
    if (items && items[0]) setSelectedId(items[0].id);
  };

  const applyClient = (clientId) => {
    const client = clients.find((c) => String(c.id) === String(clientId));

    setDraft((d) => ({
      ...d,
      clientId,
      clientName: client?.name ?? "",
      clientEmail: client?.email ?? "",
    }));

    setClientQuery("");
  };

  /* =========================
   Milestone Actions
========================= */

  const updateMilestones = (updater) => {
    setDraft((prev) => {
      const milestones = updater(prev.milestones || []);
      return {
        ...prev,
        milestones,
        progress: calcProgress(milestones),
      };
    });
  };

  const addMilestone = () =>
    updateMilestones((list) => [
      ...list,
      {
        id: `MS-${Date.now()}`,
        title: "New milestone",
        due: "",
        status: "todo",
      },
    ]);

  const updateMilestone = (id, patch) =>
    updateMilestones((list) =>
      list.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );

  const removeMilestone = (id) =>
    updateMilestones((list) => list.filter((m) => m.id !== id));

  async function saveProject() {
    if (!draft.name.trim()) {
      alert("Project name is required.");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      const payload = {
        ...draft,
        progress: calcProgress(draft.milestones),
      };

      if (isCreating) {
        const created = await ProjectsService.create(payload);
        setIsCreating(false);
        setPage(1);
        if (created?.id) setSelectedId(created.id);
        return;
      }

      const updated = await ProjectsService.update(payload.id, payload);

      setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch {
      setErr("Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    if (!id) return;

    try {
      setLoading(true);
      await ProjectsService.remove(id);

      setItems((prev) => prev.filter((p) => p.id !== id));
      setSelectedId(null);
    } catch {
      setErr("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     Return
  ========================= */

  return {
    clients,
    items,
    total,
    loading,
    err,

    selected,
    selectedId,
    isCreating,
    draft,

    status,
    setStatus,
    q,
    setQ,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    from,
    to,

    startCreate,
    cancelCreate,
    applyClient,
    saveProject,
    deleteProject,

    setSelectedId,
    setDraft,
    setIsCreating,

    clientQuery,
    setClientQuery,
    filteredClients,

    addMilestone,
    updateMilestone,
    removeMilestone,
  };
}
