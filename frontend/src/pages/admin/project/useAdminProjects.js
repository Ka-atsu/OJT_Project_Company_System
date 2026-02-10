import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectsService, emptyProject } from "./projects.services";

function calcProgressFromMilestones(milestones) {
  const list = Array.isArray(milestones) ? milestones : [];
  const total = list.length;
  if (total === 0) return 0;
  const done = list.filter((m) => m.status === "done").length;
  return Math.round((done / total) * 100);
}

export default function useAdminProjects() {
  const [clients, setClients] = useState([]);

  const [status, setStatus] = useState("active");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due_asc");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [clientQuery, setClientQuery] = useState("");

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

  const [draft, setDraft] = useState(() => {
    const d = emptyProject();
    return { ...d, progress: 0, photos: [] };
  });

  const abortRef = useRef(null);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  const filteredClients = useMemo(() => {
    if (!clientQuery.trim()) return clients;

    const q = clientQuery.toLowerCase();

    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q),
    );
  }, [clients, clientQuery]);

  const showing = isCreating
    ? "New project"
    : selected
      ? selected.id
      : "Select a project";

  useEffect(() => setPage(1), [status, q, sort, pageSize]);

  useEffect(() => {
    const controller = new AbortController();
    ProjectsService.clients(controller.signal)
      .then(setClients)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    ProjectsService.list({ page, pageSize, status, q, sort }, controller.signal)
      .then(({ items: nextItems, total: nextTotal }) => {
        setItems(nextItems);
        setTotal(nextTotal);
        if (!isCreating && !selectedId && nextItems[0])
          setSelectedId(nextItems[0].id);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setErr(e?.message ?? "Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, pageSize, status, q, sort, isCreating, selectedId]);

  useEffect(() => {
    if (!selected || isCreating) return;

    const milestones = Array.isArray(selected.milestones)
      ? selected.milestones
      : [];

    setDraft({
      ...selected,
      budget: String(selected.budget ?? ""),
      milestones,
      photos: [],
      progress: calcProgressFromMilestones(milestones),
    });

    setClientQuery(selected.clientName || "");
  }, [selected, isCreating]);

  function startCreate() {
    setIsCreating(true);
    setSelectedId(null);

    const d = emptyProject();
    const milestones = Array.isArray(d.milestones) ? d.milestones : [];

    setDraft({
      ...d,
      milestones,
      photos: [],
      progress: calcProgressFromMilestones(milestones),
    });
  }

  function cancelCreate() {
    setIsCreating(false);
    if (items[0]) setSelectedId(items[0].id);
  }

  function applyClient(clientId) {
    const c = clients.find((x) => String(x.id) === String(clientId));

    setDraft((d) => ({
      ...d,
      clientId,
      clientName: c?.name ?? "",
      clientEmail: c?.email ?? "",
    }));

    // reflect selection in search box
    setClientQuery(c?.name ?? "");
  }

  async function saveProject() {
    if (!draft.name.trim()) return alert("Project name is required.");

    try {
      setLoading(true);
      setErr("");

      const payloadDraft = {
        ...draft,
        progress: calcProgressFromMilestones(draft.milestones),
      };

      if (isCreating) {
        const created = await ProjectsService.create(payloadDraft);
        setIsCreating(false);
        setPage(1);
        if (created?.id) setSelectedId(created.id);
        return;
      }

      const updated = await ProjectsService.update(
        payloadDraft.id,
        payloadDraft,
      );

      if (updated?.id) {
        setItems((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
      }
    } catch (e) {
      setErr(e?.message ?? "Save failed");
    } finally {
      setLoading(false);
    }
  }

  function addMilestone() {
    const id = `MS-${Date.now()}`;
    setDraft((d) => {
      const milestones = [
        ...(d.milestones || []),
        { id, title: "New milestone", due: "", status: "todo" },
      ];
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones),
      };
    });
  }

  function updateMilestone(msId, patch) {
    setDraft((d) => {
      const milestones = (d.milestones || []).map((m) =>
        m.id === msId ? { ...m, ...patch } : m,
      );
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones),
      };
    });
  }

  function removeMilestone(msId) {
    setDraft((d) => {
      const milestones = (d.milestones || []).filter((m) => m.id !== msId);
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones),
      };
    });
  }

  return {
    clients,
    items,
    setItems,
    total,
    loading,
    err,
    selectedId,
    isCreating,
    selected,
    draft,

    status,
    setStatus,
    q,
    setQ,
    sort,
    setSort,
    pageSize,
    setPageSize,
    page,
    setPage,
    pageCount,
    from,
    to,
    showing,

    startCreate,
    cancelCreate,
    applyClient,
    saveProject,
    addMilestone,
    updateMilestone,
    removeMilestone,
    setIsCreating,
    setSelectedId,
    setDraft,

    clientQuery,
    setClientQuery,
    filteredClients,
  };
}
