import { useEffect, useMemo, useRef, useState } from "react";

/* =====================
   STATUS MAP
===================== */
export const STATUS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
};

/* =====================
   FAKE DATA + API
===================== */
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
    const mode = i % 2 === 0 ? "online" : "ftf";

    out.push({
      id: `APT-${1000 + i}`,
      client: names[i % names.length],
      email: `client${i}@mail.com`,
      type: types[i % types.length],
      status,
      mode,
      requestedAt: `2026-01-${pad(10 + (i % 10))}`,
      requestedFor: `2026-02-${pad(day)} ${pad(hour)}:00`,
      meeting:
        status === "approved" || status === "rescheduled"
          ? mode === "online"
            ? { link: "https://meet.google.com/xxx", location: "", notes: "" }
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
        a.type.toLowerCase().includes(s),
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

/* =====================
   HOOK
===================== */
export function useAdminAppointments() {
  const all = useMemo(() => makeFakeAppointments(73), []);

  const [status, setStatus] = useState("pending");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("requestedFor_asc");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

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
        if (e?.name !== "AbortError") setErr(e?.message ?? "Failed to load");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [all, page, pageSize, status, q, sort]);

  useEffect(() => {
    if (!selected) return;
    setActionNote("");
    setNewDateTime(selected.requestedFor.replace(" ", "T"));
    setMeetingLink(selected.meeting?.link ?? "");
    setMeetingLocation(selected.meeting?.location ?? "");
    setMeetingNotes(selected.meeting?.notes ?? "");
  }, [selectedId]);

  function updateSelected(patch) {
    setItems((prev) =>
      prev.map((x) => (x.id === selectedId ? { ...x, ...patch } : x)),
    );
  }

  function buildMeetingPatch() {
    if (!selected) return {};
    if (selected.mode === "online")
      return { link: meetingLink, location: "", notes: meetingNotes };
    return { link: "", location: meetingLocation, notes: meetingNotes };
  }

  function approve() {
    updateSelected({ status: "approved", meeting: buildMeetingPatch() });
  }
  function reject() {
    updateSelected({ status: "rejected" });
  }
  function cancel() {
    updateSelected({ status: "cancelled" });
  }
  function reschedule() {
    updateSelected({
      status: "rescheduled",
      requestedFor: newDateTime.replace("T", " "),
      meeting: buildMeetingPatch(),
    });
  }

  return {
    STATUS,
    items,
    loading,
    err,
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
    total,
    selected,
    selectedId,
    setSelectedId,
    meetingLink,
    setMeetingLink,
    meetingLocation,
    setMeetingLocation,
    meetingNotes,
    setMeetingNotes,
    actionNote,
    setActionNote,
    newDateTime,
    setNewDateTime,
    approve,
    reject,
    cancel,
    reschedule,
  };
}
