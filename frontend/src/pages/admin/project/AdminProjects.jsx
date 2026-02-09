import React from "react";
import "./admin-projects.css";
import { MSTATUS } from "./projects.services";
import AdminProjectsList from "./adminProjectsList";
import { Badge, Field } from "./adminProjectsUi";
import useAdminProjects from "./useAdminProjects";

export default function AdminProjects() {
  const {
    clients,
    items,
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
  } = useAdminProjects();

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
        <AdminProjectsList
          loading={loading}
          err={err}
          items={items}
          total={total}
          from={from}
          to={to}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
          pageSize={pageSize}
          setPageSize={setPageSize}
          q={q}
          setQ={setQ}
          page={page}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
          onNew={startCreate}
          onSelect={(id) => {
            setIsCreating(false);
            setSelectedId(id);
          }}
          selectedId={selectedId}
        />

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
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    ) : null}

                    <button
                      className="ap-btn ap-btn--primary"
                      type="button"
                      onClick={saveProject}
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </Field>

                  <Field label="Status">
                    <select
                      value={draft.status}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, status: e.target.value }))
                      }
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </Field>

                  <Field label="Due date">
                    <input
                      type="date"
                      value={draft.dueDate || ""}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, dueDate: e.target.value }))
                      }
                      disabled={loading}
                    />
                  </Field>

                  <Field label="Budget (₱)">
                    <input
                      value={draft.budget}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, budget: e.target.value }))
                      }
                      placeholder="e.g., 120000"
                      disabled={loading}
                    />
                  </Field>

                  <Field label="Progress (%)">
                    <input
                      type="number"
                      value={draft.progress ?? 0}
                      readOnly
                      disabled
                      title="Progress is automatically calculated from milestones"
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
                    disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
                  >
                    + Add milestone
                  </button>
                </div>

                {(draft.milestones || []).length === 0 ? (
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
                            disabled={loading}
                          />

                          <select
                            className="ap-ms__status"
                            value={m.status}
                            onChange={(e) =>
                              updateMilestone(m.id, { status: e.target.value })
                            }
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
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
