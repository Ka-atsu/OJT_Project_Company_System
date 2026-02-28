import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";
import {
  adminListAppointments,
  adminUpdateAppointment,
} from "./adminAppointments.service";
import { useSearchParams } from "react-router-dom";

const STATUS_OPTIONS = ["all", "pending", "accepted", "declined"];

function mapApiItemToUi(a) {
  const statusRaw = a.approvalStatus ?? a.approval_status ?? "pending";
  const status = String(statusRaw).trim().toLowerCase();

  return {
    id: a.id,
    client:
      a.client ?? (a.phone ? `Client (${a.phone})` : `Appointment #${a.id}`),
    email: a.email ?? "",
    type: a.purpose,
    status,
    mode: a.mode,
    requestedFor: a.scheduled_at
      ? new Date(a.scheduled_at).toLocaleString()
      : `${a.date ?? ""} ${a.time ?? ""}`.trim(),
    scheduledAt: a.scheduled_at ?? null,
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
  const [searchParams] = useSearchParams();
  const selectParam = searchParams.get("select");
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
  const [actionNote, setActionNote] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [newDateTime, setNewDateTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const requestIdRef = useRef(0);

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, q, sort, pageSize]);

  // Fetch appointments
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

        const mapped = (data?.data ?? []).map(mapApiItemToUi);
        setItems(mapped);
        setTotal(data?.total ?? 0);

        if (mapped.length > 0) {
          const queryId = selectParam ? Number(selectParam) : null;

          if (queryId) {
            const exists = mapped.find((a) => a.id === queryId);
            if (exists) {
              setSelectedId(queryId);
              return;
            }
          }

          // fallback to first item
          if (!selectedId) {
            setSelectedId(mapped[0].id);
          }
        }
        // Ignore canceled requests
        if (
          axios.isCancel?.(e) ||
          e.code === "ERR_CANCELED" ||
          e.message === "canceled"
        ) {
          return;
        }

        if (requestId !== requestIdRef.current) return;

        setErr(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load appointments",
        );
      })
      .finally(() => {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      });
  }, [page, pageSize, status, q, sort]);

  // Sync selected details
  useEffect(() => {
    if (!selected) return;

    setActionNote(selected.raw?.admin_note ?? "");
    setMeetingLink(selected.meeting?.link ?? "");
    setMeetingLocation(selected.meeting?.location ?? "");
    setMeetingNotes(selected.meeting?.notes ?? "");
    setNewDateTime(
      selected.raw?.scheduled_at ? selected.raw.scheduled_at.slice(0, 16) : "",
    );
  }, [selected]);

  const refresh = useCallback(() => {
    setPage((prev) => prev); // trigger effect
  }, []);

  async function patchSelected(payload) {
    if (!selected) return;

    const updated = await adminUpdateAppointment(selected.id, payload);

    setItems((prev) =>
      prev.map((x) => (x.id === selected.id ? mapApiItemToUi(updated) : x)),
    );

    setSuccessMessage("Saved successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function buildMeetingPayload() {
    if (!selected) return {};

    return selected.mode === "online"
      ? { meeting_link: meetingLink || null, location: null }
      : { meeting_link: null, location: meetingLocation || null };
  }

  async function approve() {
    if (!selected) return;

    if (selected.mode === "online") {
      if (!meetingLink.trim()) return alert("Meeting link is required.");

      if (!isValidUrl(meetingLink.trim()))
        return alert("Enter a valid http/https URL.");
    }

    if (selected.mode === "f2f" && !meetingLocation.trim()) {
      return alert("Location is required.");
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
    if (!selected) return;

    if (!newDateTime) return alert("Select a new date and time.");

    if (new Date(newDateTime) < new Date()) {
      return alert("Cannot reschedule to past date.");
    }

    await patchSelected({
      scheduled_at: new Date(newDateTime).toISOString(),
      ...buildMeetingPayload(),
      admin_note: actionNote || null,
      meeting_notes: meetingNotes || null,
    });

    alert("Appointment rescheduled.");
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
    successMessage,
  };
}
