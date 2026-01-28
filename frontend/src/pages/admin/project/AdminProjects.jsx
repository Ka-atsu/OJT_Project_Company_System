import React, { useEffect, useMemo, useRef, useState } from "react";
import "./admin-projects.css";

const PSTATUS = {
  draft: "Draft",
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
};

const MSTATUS = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

function Badge({ tone = "muted", children }) {
  return <span className={`ap-badge ap-badge--${tone}`}>{children}</span>;
}

function StatusBadge({ status }) {
  const tone =
    status === "active"
      ? "success"
      : status === "completed"
        ? "primary"
        : status === "on_hold"
          ? "warning"
          : "muted";
  return <Badge tone={tone}>{PSTATUS[status] ?? status}</Badge>;
}

function Field({ label, children }) {
  return (
    <label className="ap-field">
      <span className="ap-field__label">{label}</span>
      {children}
    </label>
  );
}

/** ---------------- TEMP: Fake data ---------------- */
function makeFakeClients() {
  return [
    { id: "C-100", name: "A. Santos", email: "asantos@mail.com" },
    { id: "C-101", name: "J. Rivera", email: "jrivera@mail.com" },
    { id: "C-102", name: "M. Dela Cruz", email: "mdc@mail.com" },
    { id: "C-103", name: "K. Tan", email: "ktan@mail.com" },
    { id: "C-104", name: "L. Reyes", email: "lreyes@mail.com" },
  ];
}

function makeFakeProjects(n = 38, clients = []) {
  const services = [
    "Backfill Sourcing",
    "Land Sourcing",
    "Land Development",
    "Site Management",
    "Equipment Leasing",
    "Land Dev Support",
    "PM Consultation",
  ];

  const sites = [
    "Brgy. San Roque, Calamba",
    "Sta. Rosa Laguna",
    "Biñan Industrial Area",
    "Cabuyao Riverside",
    "Nuvali Area, Sta. Rosa",
    "San Pedro Boundary",
    "Silang Access Road",
  ];

  const scopes = [
    "Backfill (500m³) + Hauling",
    "Backfill (1200m³) + Compaction",
    "Clearing + Grading",
    "Site Coordination (Daily)",
    "Excavator + Dump Trucks (2 weeks)",
    "Supplemental Works (Drainage/Compaction)",
    "Sequencing + Sourcing Strategy",
  ];

  const statuses = ["draft", "active", "on_hold", "completed"];
  const pad = (x) => String(x).padStart(2, "0");

  const out = [];
  for (let i = 0; i < n; i++) {
    const c = clients[i % clients.length];
    const status = statuses[i % statuses.length];

    const service = services[i % services.length];
    const site = sites[i % sites.length];
    const scope = scopes[i % scopes.length];

    const start = `2026-01-${pad(5 + (i % 20))}`;
    const due = `2026-03-${pad(1 + (i % 27))}`;

    const progress =
      status === "completed"
        ? 100
        : status === "active"
          ? 35 + (i % 55)
          : status === "on_hold"
            ? 15 + (i % 25)
            : 5 + (i % 10);

    // Construction-style milestones
    const ms = [
      {
        id: `MS-${i}-1`,
        title: "Site inspection + requirements",
        due: `2026-02-${pad(3 + (i % 10))}`,
        status: status === "draft" ? "todo" : "done",
      },
      {
        id: `MS-${i}-2`,
        title: "Quotation + approval",
        due: `2026-02-${pad(12 + (i % 10))}`,
        status: status === "completed" ? "done" : "doing",
      },
      {
        id: `MS-${i}-3`,
        title: "Mobilization + execution",
        due: `2026-03-${pad(1 + (i % 10))}`,
        status: status === "completed" ? "done" : "todo",
      },
    ];

    out.push({
      id: `PRJ-${1200 + i}`,
      name: `${service} — ${site} (${scope})`,
      status,

      clientId: c?.id ?? "",
      clientName: c?.name ?? "",
      clientEmail: c?.email ?? "",

      startDate: start,
      dueDate: due,
      budget: 150000 + i * 8500, // more realistic construction budget
      progress,

      // better description for your service
      description: `Service: ${service}. Site: ${site}. Scope: ${scope}.`,
      milestones: ms,

      updatedAt: `2026-01-${pad(10 + (i % 10))}`,
    });
  }

  return out;
}

async function fakeFetchProjects({
  all,
  page,
  pageSize,
  status,
  q,
  sort,
  signal,
}) {
  await new Promise((r) => setTimeout(r, 220));
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  let items = [...all];

  if (status !== "all") items = items.filter((p) => p.status === status);

  if (q.trim()) {
    const s = q.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.id.toLowerCase().includes(s) ||
        p.name.toLowerCase().includes(s) ||
        (p.clientName ?? "").toLowerCase().includes(s),
    );
  }

  if (sort === "due_asc")
    items.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  if (sort === "due_desc")
    items.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  if (sort === "updated_desc")
    items.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return { items: paged, total };
}
/** ------------------------------------------------ */

function emptyProject() {
  return {
    id: "",
    name: "",
    status: "draft",
    clientId: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    dueDate: "",
    budget: "",
    progress: 0,
    description: "",
    milestones: [],
    updatedAt: "",
  };
}

export default function AdminProjects() {
  const clients = useMemo(() => makeFakeClients(), []);
  const [allProjects, setAllProjects] = useState(() =>
    makeFakeProjects(46, clients),
  );

  // list controls
  const [status, setStatus] = useState("active");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due_asc");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  // list data
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // selection / create mode
  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

  // form state (edit/create)
  const [draft, setDraft] = useState(emptyProject());

  const abortRef = useRef(null);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => setPage(1), [status, q, sort, pageSize]);

  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    fakeFetchProjects({
      all: allProjects,
      page,
      pageSize,
      status,
      q,
      sort,
      signal: controller.signal,
    })
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);

        // auto select
        if (!isCreating && !selectedId && data.items[0])
          setSelectedId(data.items[0].id);
      })
      .catch((e) => {
        if (e?.name !== "AbortError")
          setErr(e?.message ?? "Failed to load projects");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [allProjects, page, pageSize, status, q, sort, isCreating, selectedId]);

  // sync draft when selecting
  useEffect(() => {
    if (!selected || isCreating) return;
    setDraft({
      ...selected,
      budget: String(selected.budget ?? ""),
    });
  }, [selectedId, isCreating]); // eslint-disable-line

  function startCreate() {
    setIsCreating(true);
    setSelectedId(null);
    setDraft(emptyProject());
  }

  function cancelCreate() {
    setIsCreating(false);
    // select first if exists
    if (items[0]) setSelectedId(items[0].id);
  }

  function applyClient(clientId) {
    const c = clients.find((x) => x.id === clientId);
    setDraft((d) => ({
      ...d,
      clientId,
      clientName: c?.name ?? "",
      clientEmail: c?.email ?? "",
    }));
  }

  function saveProject() {
    // simple validation
    if (!draft.name.trim()) return alert("Project name is required.");

    const now = "2026-01-27"; // for demo

    if (isCreating) {
      const nextId = `PRJ-${Math.floor(1000 + Math.random() * 8999)}`;
      const created = {
        ...draft,
        id: nextId,
        budget: Number(draft.budget || 0),
        updatedAt: now,
      };
      setAllProjects((prev) => [created, ...prev]);
      setIsCreating(false);
      setSelectedId(created.id);
      return;
    }

    // update existing
    setAllProjects((prev) =>
      prev.map((p) =>
        p.id === draft.id
          ? { ...draft, budget: Number(draft.budget || 0), updatedAt: now }
          : p,
      ),
    );
  }

  function addMilestone() {
    const id = `MS-${Date.now()}`;
    setDraft((d) => ({
      ...d,
      milestones: [
        ...d.milestones,
        { id, title: "New milestone", due: "", status: "todo" },
      ],
    }));
  }

  function updateMilestone(msId, patch) {
    setDraft((d) => ({
      ...d,
      milestones: d.milestones.map((m) =>
        m.id === msId ? { ...m, ...patch } : m,
      ),
    }));
  }

  function removeMilestone(msId) {
    setDraft((d) => ({
      ...d,
      milestones: d.milestones.filter((m) => m.id !== msId),
    }));
  }

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  const showing = isCreating
    ? "New project"
    : selected
      ? selected.id
      : "Select a project";

  return (
    <div className="ap">
      <header className="ap-header">
        <div>
          <h1 className="ap-title">Manage Projects</h1>
          <p className="ap-sub">
            Create/edit projects, assign clients, update milestones.
          </p>
        </div>
      </header>

      <main className="ap-grid">
        {/* List */}
        <section className="ap-card">
          <div className="ap-card__header">
            <div>
              <h2 className="ap-card__title">Projects</h2>
              <div className="ap-card__meta">
                {loading ? "Loading…" : `Showing ${from}–${to} of ${total}`}
              </div>
            </div>

            <button
              className="ap-btn ap-btn--primary"
              type="button"
              onClick={startCreate}
            >
              + New
            </button>
          </div>

          <div className="ap-toolbar">
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
                <option value="on_hold">on_hold</option>
                <option value="completed">completed</option>
                <option value="all">all</option>
              </select>
            </Field>

            <Field label="Sort">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="due_asc">due (soonest)</option>
                <option value="due_desc">due (latest)</option>
                <option value="updated_desc">recently updated</option>
              </select>
            </Field>

            <Field label="Per page">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>
            </Field>

            <Field label="Search">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, ID, client…"
              />
            </Field>
          </div>

          {err ? <div className="ap-empty">Error: {err}</div> : null}

          <div className="ap-list">
            {loading ? (
              <div className="ap-empty">Loading projects…</div>
            ) : items.length === 0 ? (
              <div className="ap-empty">No results.</div>
            ) : (
              items.map((p) => (
                <button
                  key={p.id}
                  className={`ap-item ${p.id === selectedId ? "is-active" : ""}`}
                  onClick={() => {
                    setIsCreating(false);
                    setSelectedId(p.id);
                  }}
                  type="button"
                >
                  <div className="ap-item__top">
                    <div className="ap-strong">{p.name}</div>
                    <StatusBadge status={p.status} />
                  </div>

                  <div className="ap-muted ap-small">
                    <span className="ap-mono">{p.id}</span> •{" "}
                    {p.clientName || "Unassigned"}
                  </div>

                  <div className="ap-item__bottom">
                    <div className="ap-small">Due</div>
                    <div className="ap-mono">{p.dueDate || "—"}</div>
                  </div>

                  <div className="ap-progress">
                    <div
                      className="ap-progress__bar"
                      style={{ width: `${p.progress || 0}%` }}
                    />
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="ap-pagination">
            <button
              className="ap-btn ap-btn--ghost"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
            >
              ← Prev
            </button>

            <div className="ap-pagination__meta">
              Page <span className="ap-mono">{page}</span> /{" "}
              <span className="ap-mono">{pageCount}</span>
            </div>

            <button
              className="ap-btn ap-btn--ghost"
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount || loading}
            >
              Next →
            </button>
          </div>
        </section>

        {/* Details */}
        <section className="ap-card">
          <div className="ap-card__header">
            <h2 className="ap-card__title">Details</h2>
            <div className="ap-card__meta">{showing}</div>
          </div>

          {!isCreating && !selected ? (
            <div className="ap-empty">
              Select a project on the left, or click “New”.
            </div>
          ) : (
            <div className="ap-details">
              {/* Project info */}
              <div className="ap-block">
                <div className="ap-block__top">
                  <h3 className="ap-h3">
                    {isCreating ? "Create project" : "Project info"}
                  </h3>

                  <div className="ap-block__actions">
                    {isCreating ? (
                      <button
                        className="ap-btn ap-btn--ghost"
                        type="button"
                        onClick={cancelCreate}
                      >
                        Cancel
                      </button>
                    ) : null}
                    <button
                      className="ap-btn ap-btn--primary"
                      type="button"
                      onClick={saveProject}
                    >
                      {isCreating ? "Create" : "Save"}
                    </button>
                  </div>
                </div>

                <div className="ap-twoCol">
                  <Field label="Project name">
                    <input
                      value={draft.name}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, name: e.target.value }))
                      }
                      placeholder="e.g., Client Portal v1"
                    />
                  </Field>

                  <Field label="Status">
                    <select
                      value={draft.status}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, status: e.target.value }))
                      }
                    >
                      <option value="draft">draft</option>
                      <option value="active">active</option>
                      <option value="on_hold">on_hold</option>
                      <option value="completed">completed</option>
                    </select>
                  </Field>

                  <Field label="Start date">
                    <input
                      type="date"
                      value={draft.startDate || ""}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, startDate: e.target.value }))
                      }
                    />
                  </Field>

                  <Field label="Due date">
                    <input
                      type="date"
                      value={draft.dueDate || ""}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, dueDate: e.target.value }))
                      }
                    />
                  </Field>

                  <Field label="Budget (₱)">
                    <input
                      value={draft.budget}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, budget: e.target.value }))
                      }
                      placeholder="e.g., 120000"
                    />
                  </Field>

                  <Field label="Progress (%)">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={draft.progress ?? 0}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          progress: Number(e.target.value || 0),
                        }))
                      }
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    className="ap-textarea"
                    value={draft.description}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, description: e.target.value }))
                    }
                    placeholder="Short summary / scope…"
                  />
                </Field>
              </div>

              {/* Client assignment */}
              <div className="ap-block">
                <h3 className="ap-h3">Assign client</h3>

                <div className="ap-twoCol">
                  <Field label="Client">
                    <select
                      value={draft.clientId || ""}
                      onChange={(e) => applyClient(e.target.value)}
                    >
                      <option value="">— Unassigned —</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="ap-kv">
                    <div className="ap-k">Email</div>
                    <div className="ap-v ap-mono">
                      {draft.clientEmail || "—"}
                    </div>
                  </div>
                </div>

                {draft.clientId ? (
                  <div className="ap-muted ap-small">
                    Assigned to{" "}
                    <span className="ap-strong">{draft.clientName}</span>.
                  </div>
                ) : (
                  <div className="ap-muted ap-small">
                    No client assigned yet.
                  </div>
                )}
              </div>

              {/* Milestones */}
              <div className="ap-block">
                <div className="ap-block__top">
                  <h3 className="ap-h3">Milestones</h3>
                  <button
                    className="ap-btn ap-btn--ghost"
                    type="button"
                    onClick={addMilestone}
                  >
                    + Add milestone
                  </button>
                </div>

                {draft.milestones.length === 0 ? (
                  <div className="ap-muted ap-small">No milestones yet.</div>
                ) : (
                  <div className="ap-milestones">
                    {draft.milestones.map((m) => (
                      <div key={m.id} className="ap-ms">
                        <div className="ap-ms__row">
                          <input
                            className="ap-ms__title"
                            value={m.title}
                            onChange={(e) =>
                              updateMilestone(m.id, { title: e.target.value })
                            }
                          />

                          <select
                            className="ap-ms__status"
                            value={m.status}
                            onChange={(e) =>
                              updateMilestone(m.id, { status: e.target.value })
                            }
                          >
                            <option value="todo">todo</option>
                            <option value="doing">doing</option>
                            <option value="done">done</option>
                          </select>

                          <button
                            className="ap-ms__del"
                            type="button"
                            onClick={() => removeMilestone(m.id)}
                            title="Remove milestone"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="ap-ms__row ap-ms__row--meta">
                          <div className="ap-muted ap-small">Due</div>
                          <input
                            type="date"
                            value={m.due || ""}
                            onChange={(e) =>
                              updateMilestone(m.id, { due: e.target.value })
                            }
                          />
                          <Badge
                            tone={m.status === "done" ? "success" : "muted"}
                          >
                            {MSTATUS[m.status] ?? m.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="ap-muted ap-small">
                  Tip: hit <span className="ap-mono">Save</span> after editing
                  milestones.
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
