import React from "react";
import { Field, StatusBadge } from "./adminProjectsUi";

export default function AdminProjectsList({
  loading,
  err,
  items,
  total,
  from,
  to,
  status,
  setStatus,
  sort,
  setSort,
  pageSize,
  setPageSize,
  q,
  setQ,
  page,
  pageCount,
  onPrev,
  onNext,
  onNew,
  onSelect,
  selectedId,
}) {
  return (
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
          onClick={onNew}
          disabled={loading}
        >
          + New
        </button>
      </div>

      <div className="ap-toolbar">
        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="active">active</option>
            <option value="draft">draft</option>
            <option value="on_hold">on_hold</option>
            <option value="completed">completed</option>
            <option value="all">all</option>
          </select>
        </Field>

        <Field label="Sort">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            disabled={loading}
          >
            <option value="due_asc">due (soonest)</option>
            <option value="due_desc">due (latest)</option>
            <option value="updated_desc">recently updated</option>
          </select>
        </Field>

        <Field label="Per page">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            disabled={loading}
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
            disabled={loading}
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
              onClick={() => onSelect(p.id)}
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
          onClick={onPrev}
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
          onClick={onNext}
          disabled={page >= pageCount || loading}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
