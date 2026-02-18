// useAdminAppointments.js
import { useEffect, useMemo, useRef, useState } from "react";
import {
  adminListAppointments,
  adminUpdateAppointment,
} from "./adminAppointments.service";

const STATUS_OPTIONS = ["all", "pending", "accepted", "declined"];

function mapApiItemToUi(a) {
  const statusRaw = a.approvalStatus ?? a.approval_status ?? "pending";
  const status = String(statusRaw).trim().toLowerCase(); // pending|accepted|declined

  return {
    id: a.id,
    client:
      a.client ?? (a.phone ? `Client (${a.phone})` : `Appointment #${a.id}`),
    email: a.email ?? "",
    type: a.purpose,
    status,
    mode: a.mode,
    requestedFor: `${a.date ?? ""} ${a.time ?? ""}`.trim(),
    meeting: {
      link: a.meetingLink ?? a.meeting_link ?? "",
      location: a.location ?? "",
      notes: a.meeting_notes ?? "",
    },
    raw: a,
  };
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function useAdminAppointments() {
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
  const requestIdRef = useRef(0);

  useEffect(() => setPage(1), [status, q, sort, pageSize]);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setErr("");

    const sortParam =
      sort === "requestedFor_desc"
        ? "scheduled_at_desc"
        : sort === "requestedAt_desc"
          ? "created_at_desc"
          : "scheduled_at_asc";

    adminListAppointments({
      status: STATUS_OPTIONS.includes(status) ? status : "all",
      page,
      limit: pageSize,
      q,
      sort: sortParam,
    })
      .then((data) => {
        if (requestId !== requestIdRef.current) return;

        const mapped = (data.data || []).map(mapApiItemToUi);
        setItems(mapped);
        setTotal(data.total || 0);

        if (!selectedId && mapped[0]) setSelectedId(mapped[0].id);
      })
      .catch((e) => {
        if (requestId !== requestIdRef.current) return;
        setErr(e?.response?.data?.message || e?.message || "Failed to load");
      })
      .finally(() => {
        if (requestId === requestIdRef.current) setLoading(false);
      });
  }, [page, pageSize, status, q, sort]);

  useEffect(() => {
    if (!selected) return;

    setActionNote(selected.raw?.admin_note ?? "");
    setMeetingLink(selected.meeting?.link ?? "");
    setMeetingLocation(selected.meeting?.location ?? "");
    setMeetingNotes(selected.meeting?.notes ?? "");

    // since your backend uses scheduled_at, easiest is: don't reschedule until you add scheduled_at in API
    // If you add scheduled_at to AppointmentResource, set:
    // setNewDateTime(selected.raw.scheduled_at?.slice(0, 16) ?? "")
    setNewDateTime("");
  }, [selectedId]);

  async function refresh() {
    // simplest: just re-trigger the effect by setting page to same value (or call list directly)
    setPage((p) => p);
  }

  async function patchSelected(payload) {
    if (!selected) return;

    const updated = await adminUpdateAppointment(selected.id, payload);

    setItems((prev) =>
      prev.map((x) => (x.id === selected.id ? mapApiItemToUi(updated) : x)),
    );
  }

  function buildMeetingPayload() {
    if (!selected) return {};

    if (selected.mode === "online") {
      return { meeting_link: meetingLink || null, location: null };
    }
    return { meeting_link: null, location: meetingLocation || null };
  }

  async function approve() {
    if (!selected) return;

    if (selected.mode === "online") {
      if (!meetingLink.trim()) {
        alert("Meeting link is required for online appointments.");
        return;
      }

      if (!isValidUrl(meetingLink.trim())) {
        alert(
          "Please enter a valid meeting URL (must start with http:// or https://).",
        );
        return;
      }
    }

    if (selected.mode === "f2f" && !meetingLocation.trim()) {
      alert("Location is required for face-to-face appointments.");
      return;
    }

    await patchSelected({
      approval_status: "accepted",
      ...buildMeetingPayload(),
      admin_note: actionNote || null,
      meeting_notes: meetingNotes || null,
    });
  }

  async function reject() {
    if (!selected) return;

    await patchSelected({
      approval_status: "declined",
      admin_note: actionNote || null,
      meeting_notes: meetingNotes || null,
    });
  }

  async function reschedule() {
    // requires backend to accept scheduled_at updates
    // and frontend must have scheduled_at available. If you add scheduled_at to resource:
    // await patchSelected({ scheduled_at: new Date(newDateTime).toISOString(), ...buildMeetingPayload() });

    alert("Reschedule needs scheduled_at support in the admin API first.");
  }

  return {
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
    reschedule,
    refresh,
  };
}
