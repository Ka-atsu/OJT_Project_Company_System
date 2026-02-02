import Select from "react-select";

function Badge({ status }) {
  return <span className={`aa-badge aa-badge--${status}`}>{status}</span>;
}

function Field({ label, children }) {
  return (
    <label className="aa-field">
      <span className="aa-field__label">{label}</span>
      {children}
    </label>
  );
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

const SORT_OPTIONS = [
  { value: "requestedFor_asc", label: "Upcoming" },
  { value: "requestedFor_desc", label: "Latest scheduled" },
  { value: "requestedAt_desc", label: "Newest request" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 12, label: "12" },
  { value: 24, label: "24" },
  { value: 50, label: "50" },
];

export default function AppointmentsList({
  items,
  loading,
  err,
  status,
  setStatus,
  sort,
  setSort,
  pageSize,
  setPageSize,
  q,
  setQ,
  page,
  setPage,
  pageCount,
  from,
  to,
  selectedId,
  setSelectedId,
}) {
  return (
    <section className="aa-card">
      <div className="aa-card__header">
        <h2 className="aa-card__title">Appointments</h2>
        <div className="aa-card__meta">
          {loading ? "Loading…" : `Showing ${from}–${to}`}
        </div>
      </div>

      <div className="aa-toolbar">
        <Field label="Status">
          <Select
            classNamePrefix="appt-select"
            value={STATUS_OPTIONS.find((o) => o.value === status)}
            onChange={(opt) => setStatus(opt.value)}
            options={STATUS_OPTIONS}
            isSearchable={false}
          />
        </Field>

        <Field label="Sort">
          <Select
            classNamePrefix="appt-select"
            value={SORT_OPTIONS.find((o) => o.value === sort)}
            onChange={(opt) => setSort(opt.value)}
            options={SORT_OPTIONS}
            isSearchable={false}
          />
        </Field>

        <Field label="Per page">
          <Select
            classNamePrefix="appt-select"
            value={PAGE_SIZE_OPTIONS.find((o) => o.value === pageSize)}
            onChange={(opt) => setPageSize(opt.value)}
            options={PAGE_SIZE_OPTIONS}
            isSearchable={false}
          />
        </Field>

        <Field label="Search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Client, ID, type…"
          />
        </Field>
      </div>

      {err && <div className="aa-empty">Error: {err}</div>}

      <div className="aa-list">
        {loading ? (
          <div className="aa-empty">Loading appointments…</div>
        ) : items.length === 0 ? (
          <div className="aa-empty">No results.</div>
        ) : (
          items.map((a) => (
            <button
              key={a.id}
              className={`aa-item ${a.id === selectedId ? "is-active" : ""}`}
              onClick={() => setSelectedId(a.id)}
              type="button"
            >
              <div className="aa-item__top">
                <div className="aa-strong">{a.client}</div>
                <Badge status={a.status} />
              </div>

              <div className="aa-muted aa-small">
                {a.id} • {a.type} •{" "}
                {a.mode === "online" ? "Online" : "Face-to-face"}
              </div>

              <div className="aa-item__bottom">
                <div className="aa-small">Requested for:</div>
                <div className="aa-mono">{a.requestedFor}</div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="aa-pagination">
        <button
          className="aa-btn aa-btn--ghost"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          ← Prev
        </button>

        <div className="aa-pagination__meta">
          Page {page} / {pageCount}
        </div>

        <button
          className="aa-btn aa-btn--ghost"
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page >= pageCount}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
