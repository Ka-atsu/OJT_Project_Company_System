import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ProjectsService } from "./projects.services";

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
  };
}

/* =========================
   Hook
========================= */

export default function useAdminProjects() {
  /* ---------- State ---------- */

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState("active");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due_asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState(emptyProject());

  const [clientQuery, setClientQuery] = useState("");

  const abortRef = useRef(null);

  /* ---------- Derived State ---------- */

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

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

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [status, q, sort, pageSize]);

  // Fetch Clients (Single Responsibility)
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

  // Fetch Projects
  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    ProjectsService.list(
      { page, limit: pageSize, status, q, sort },
      controller.signal,
    )
      .then(({ items: nextItems, total: nextTotal }) => {
        setItems(nextItems);
        setTotal(nextTotal);

        if (!isCreating && !selectedId && nextItems[0]) {
          setSelectedId(nextItems[0].id);
        }
      })
      .catch((e) => {
        if (
          e.name === "AbortError" ||
          e.message === "canceled" ||
          e.code === "ERR_CANCELED"
        ) {
          return;
        }

        setErr("Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, pageSize, status, q, sort, isCreating]);

  // Sync Draft when selecting project
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
     Handlers
  ========================= */

  const startCreate = () => {
    setIsCreating(true);
    setSelectedId(null);
    setDraft(emptyProject());
  };

  const cancelCreate = () => {
    setIsCreating(false);
    if (items[0]) setSelectedId(items[0].id);
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

  const updateMilestones = (updater) => {
    setDraft((d) => {
      const milestones = updater(d.milestones || []);
      return {
        ...d,
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
    addMilestone,
    updateMilestone,
    removeMilestone,

    setSelectedId,
    setDraft,
    setIsCreating,

    clientQuery,
    setClientQuery,
    filteredClients,
  };
}
