import React, { useEffect, useMemo, useRef, useState } from "react";
import "./admin-appointments.css";

const STATUS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
};

function Badge({ status }) {
  return (
    <span className={`aa-badge aa-badge--${status}`}>
      {STATUS[status] ?? status}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <label className="aa-field">
      <span className="aa-field__label">{label}</span>
      {children}
    </label>
  );
}

/** ---------------- TEMP: Fake API (replace later) ---------------- */
function makeFakeAppointments(n = 57) {
  const names = [
    "A. Santos",
    "J. Rivera",
    "M. Dela Cruz",
    "K. Tan",
    "L. Reyes",
    "P. Cruz",
  ];
  const types = [
    "Consultation",
    "Project Update",
    "Service Inquiry",
    "Support",
    "Kickoff",
  ];
  const statuses = [
    "pending",
    "approved",
    "rejected",
    "cancelled",
    "rescheduled",
  ];

  const pad = (x) => String(x).padStart(2, "0");
  const out = [];
  for (let i = 0; i < n; i++) {
    const day = 1 + (i % 27);
    const hour = 9 + (i % 8);
    const status = statuses[i % statuses.length];

    // ✅ Client chooses meeting type
    const mode = i % 2 === 0 ? "online" : "ftf";

    out.push({
      id: `APT-${1000 + i}`,
      client: names[i % names.length],
      email: `client${i}@mail.com`,
      type: types[i % types.length],
      status,

      // ✅ NEW
      mode, // "online" | "ftf"

      requestedAt: `2026-01-${pad(10 + (i % 10))}`,
      requestedFor: `2026-02-${pad(day)} ${pad(hour)}:00`,

      meeting:
        status === "approved" || status === "rescheduled"
          ? mode === "online"
            ? {
                link: "https://meet.google.com/xxx-yyyy-zzz",
                location: "",
                notes: "",
              }
            : { link: "", location: "Office - 2F Meeting Room", notes: "" }
          : { link: "", location: "", notes: "" },

      notes:
        mode === "online"
          ? "Client prefers online meeting."
          : "Client prefers face-to-face meeting.",
    });
  }
  return out;
}

async function fakeFetchAppointments({
  all,
  page,
  pageSize,
  status,
  q,
  sort,
  signal,
}) {
  await new Promise((r) => setTimeout(r, 250));
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  let items = [...all];

  if (status !== "all") items = items.filter((a) => a.status === status);

  if (q.trim()) {
    const s = q.trim().toLowerCase();
    items = items.filter(
      (a) =>
        a.id.toLowerCase().includes(s) ||
        a.client.toLowerCase().includes(s) ||
        a.type.toLowerCase().includes(s) ||
        a.requestedFor.toLowerCase().includes(s),
    );
  }

  if (sort === "requestedFor_asc")
    items.sort((a, b) => (a.requestedFor > b.requestedFor ? 1 : -1));
  if (sort === "requestedFor_desc")
    items.sort((a, b) => (a.requestedFor < b.requestedFor ? 1 : -1));
  if (sort === "requestedAt_desc")
    items.sort((a, b) => (a.requestedAt < b.requestedAt ? 1 : -1));

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return { items: paged, total };
}
/** --------------------------------------------------------------- */

export default function AdminAppointments() {
  const all = useMemo(() => makeFakeAppointments(73), []);

  // list controls
  const [status, setStatus] = useState("pending");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("requestedFor_asc");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  // list data
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // selection
  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

  // details form
  const [actionNote, setActionNote] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [newDateTime, setNewDateTime] = useState("");

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const abortRef = useRef(null);

  useEffect(() => setPage(1), [status, q, sort, pageSize]);

  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    fakeFetchAppointments({
      all,
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
        if (!selectedId && data.items[0]) setSelectedId(data.items[0].id);
      })
      .catch((e) => {
        if (e?.name !== "AbortError")
          setErr(e?.message ?? "Failed to load appointments");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [all, page, pageSize, status, q, sort]); // eslint-disable-line

  // when selection changes, sync meeting fields
  useEffect(() => {
    if (!selected) return;
    setActionNote("");
    setNewDateTime(selected.requestedFor.replace(" ", "T"));
    setMeetingLink(selected.meeting?.link ?? "");
    setMeetingLocation(selected.meeting?.location ?? "");
    setMeetingNotes(selected.meeting?.notes ?? "");
  }, [selectedId]); // eslint-disable-line

  function updateSelected(patch) {
    setItems((prev) =>
      prev.map((x) => (x.id === selectedId ? { ...x, ...patch } : x)),
    );
  }

  function buildMeetingPatch() {
    if (!selected) return { link: "", location: "", notes: "" };

    // ✅ Admin sets only the relevant fields based on client-chosen mode
    if (selected.mode === "online") {
      return { link: meetingLink, location: "", notes: meetingNotes };
    }
    return { link: "", location: meetingLocation, notes: meetingNotes };
  }

  function approve() {
    updateSelected({
      status: "approved",
      meeting: buildMeetingPatch(),
    });
  }

  function reject() {
    updateSelected({ status: "rejected" });
  }

  function cancel() {
    updateSelected({ status: "cancelled" });
  }

  function reschedule() {
    const formatted = newDateTime
      ? newDateTime.replace("T", " ")
      : selected?.requestedFor;

    updateSelected({
      status: "rescheduled",
      requestedFor: formatted,
      meeting: buildMeetingPatch(),
    });
  }

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <div className="aa">
      <header className="aa-header">
        <div>
          <h1 className="aa-title">Manage Appointments</h1>
          <p className="aa-sub">
            Approve, reject, reschedule, cancel, and assign meeting details.
          </p>
        </div>
      </header>

      <main className="aa-grid">
        {/* List */}
        <section className="aa-card">
          <div className="aa-card__header">
            <h2 className="aa-card__title">Appointments</h2>
            <div className="aa-card__meta">
              {loading ? "Loading…" : `Showing ${from}–${to} of ${total}`}
            </div>
          </div>

          <div className="aa-toolbar">
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">pending</option>
                <option value="approved">approved</option>
                <option value="rescheduled">rescheduled</option>
                <option value="cancelled">cancelled</option>
                <option value="rejected">rejected</option>
                <option value="all">all</option>
              </select>
            </Field>

            <Field label="Sort">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="requestedFor_asc">upcoming</option>
                <option value="requestedFor_desc">latest scheduled</option>
                <option value="requestedAt_desc">newest request</option>
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
                placeholder="Client, ID, type…"
              />
            </Field>
          </div>

          {err ? <div className="aa-empty">Error: {err}</div> : null}

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
                    <span className="aa-mono">{a.id}</span> • {a.type} •{" "}
                    <span className="aa-mono">
                      {a.mode === "online" ? "Online" : "Face-to-face"}
                    </span>
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
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
            >
              ← Prev
            </button>

            <div className="aa-pagination__meta">
              Page <span className="aa-mono">{page}</span> /{" "}
              <span className="aa-mono">{pageCount}</span>
            </div>

            <button
              className="aa-btn aa-btn--ghost"
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount || loading}
            >
              Next →
            </button>
          </div>
        </section>

        {/* Details */}
        <section className="aa-card">
          <div className="aa-card__header">
            <h2 className="aa-card__title">Details</h2>
            <div className="aa-card__meta">
              {selected ? selected.id : "Select an appointment"}
            </div>
          </div>

          {!selected ? (
            <div className="aa-empty">Select an appointment on the left.</div>
          ) : (
            <div className="aa-details">
              <div className="aa-block">
                <div className="aa-strong">{selected.client}</div>
                <div className="aa-muted">{selected.email}</div>
                <div className="aa-muted aa-small">{selected.type}</div>

                <div className="aa-kv">
                  <div className="aa-k">Status</div>
                  <div className="aa-v">
                    <Badge status={selected.status} />
                  </div>

                  <div className="aa-k">Meeting type</div>
                  <div className="aa-v aa-mono">
                    {selected.mode === "online" ? "Online" : "Face-to-face"}
                  </div>

                  <div className="aa-k">Requested at</div>
                  <div className="aa-v aa-mono">{selected.requestedAt}</div>

                  <div className="aa-k">Requested for</div>
                  <div className="aa-v aa-mono">{selected.requestedFor}</div>
                </div>

                <p className="aa-note">{selected.notes}</p>
              </div>

              <div className="aa-block">
                <h3 className="aa-h3">Meeting details (admin sets)</h3>

                <div className="aa-twoCol">
                  {selected.mode === "online" ? (
                    <Field label="Meeting link">
                      <input
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="https://meet.google.com/…"
                      />
                    </Field>
                  ) : (
                    <Field label="Location">
                      <input
                        value={meetingLocation}
                        onChange={(e) => setMeetingLocation(e.target.value)}
                        placeholder="Office / address"
                      />
                    </Field>
                  )}

                  <Field label="Notes">
                    <input
                      value={meetingNotes}
                      onChange={(e) => setMeetingNotes(e.target.value)}
                      placeholder="Agenda, instructions…"
                    />
                  </Field>
                </div>

                <div className="aa-muted aa-small">
                  {selected.mode === "online"
                    ? "Face-to-face location will be empty (client chose Online)."
                    : "Online link will be empty (client chose Face-to-face)."}
                </div>
              </div>

              <div className="aa-block">
                <h3 className="aa-h3">Actions</h3>

                <div className="aa-twoCol">
                  <Field label="Admin note / reason (optional)">
                    <input
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder="Reason for reject/cancel, etc."
                    />
                  </Field>

                  <Field label="Reschedule date & time">
                    <input
                      type="datetime-local"
                      value={newDateTime}
                      onChange={(e) => setNewDateTime(e.target.value)}
                    />
                  </Field>
                </div>

                <div className="aa-actions">
                  <button className="aa-btn" type="button" onClick={approve}>
                    Approve
                  </button>

                  <button
                    className="aa-btn aa-btn--ghost"
                    type="button"
                    onClick={reschedule}
                  >
                    Reschedule
                  </button>

                  <button
                    className="aa-btn aa-btn--ghost"
                    type="button"
                    onClick={cancel}
                  >
                    Cancel
                  </button>

                  <button
                    className="aa-btn aa-btn--danger"
                    type="button"
                    onClick={reject}
                  >
                    Reject
                  </button>
                </div>

                <div className="aa-muted aa-small">
                  Hook these buttons to your API later. Meeting type is chosen
                  by the client and cannot be changed here.
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
