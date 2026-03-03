import { useEffect, useState, useCallback, useRef } from "react";
import BookAppointment from "./BookAppointment";
import { listAppointments, createAppointment } from "./appointments.service";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./appointment.css";
import "../globalClient.css";

function getStatusDetails(a) {
  const approvalRaw = a.approvalStatus ?? "pending";
  const approval = String(approvalRaw).trim().toLowerCase();

  const meetingLink = a.meetingLink ?? null;
  const location = a.location ?? null;

  const needsLink = a.mode === "online" && !meetingLink;
  const needsLocation = a.mode === "f2f" && !location;

  if (approval === "pending") {
    return "Pending — admin will confirm and send details.";
  }

  if (approval === "declined") {
    return "Declined.";
  }

  if (approval === "accepted") {
    if (needsLink || needsLocation) {
      return "Approved — waiting for meeting details.";
    }

    if (a.mode === "online") {
      return `Link: ${meetingLink}`;
    }

    return `Location: ${location}`;
  }

  return "Pending — admin will confirm and send details.";
}

function getApiErrorMessage(err, fallback = "Something went wrong.") {
  return (
    err?.response?.data?.message ||
    (err?.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join("\n")
      : null) ||
    err?.message ||
    fallback
  );
}

export default function ClientAppointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [open, setOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;

  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    try {
      const res = await listAppointments({ status: activeTab, page, limit });

      if (requestId !== requestIdRef.current) return;

      const nextTotalPages = res.totalPages || 1;

      setAppointments(res.data || []);
      setTotalPages(nextTotalPages);

      if (page > nextTotalPages) setPage(nextTotalPages);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      console.error(err);
      alert(getApiErrorMessage(err, "Failed to load appointments."));
      setAppointments([]);
      setTotalPages(1);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [activeTab, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  useEffect(() => {
    if (searchParams.get("openModal") === "true") {
      setOpen(true);

      // Remove query param after opening modal
      const params = new URLSearchParams(searchParams);
      params.delete("openModal");
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <section className="appointment-page">
      {open && (
        <BookAppointment
          onClose={() => setOpen(false)}
          onSubmit={async (payload) => {
            try {
              await createAppointment(payload);
              setPage(1);
              await load();
            } catch (err) {
              console.error(err);
              alert(getApiErrorMessage(err, "Failed to create appointment."));
            }
          }}
        />
      )}

      <header className="appointment-header">
        <h1 className="dash-title">Appointments</h1>
        <p className="dash-subtitle">Manage schedule and consultations.</p>
      </header>

      <div className="appointment-tabs">
        <button
          className={`appointment-tab dash-btn ghost ${
            activeTab === "upcoming" ? "is-active" : ""
          }`}
          onClick={() => handleTab("upcoming")}
          type="button"
        >
          Upcoming
        </button>

        <button
          className={`appointment-tab dash-btn ghost ${
            activeTab === "past" ? "is-active" : ""
          }`}
          onClick={() => handleTab("past")}
          type="button"
        >
          Past
        </button>

        <div className="appointment-actions">
          <button
            className="dash-btn primary"
            type="button"
            onClick={() => setOpen(true)}
          >
            + Schedule New Appointment
          </button>
        </div>
      </div>

      <div className="dash-surface">
        <div className="dash-surface-header">
          <span>
            {activeTab === "upcoming"
              ? "Upcoming appointments"
              : "Past appointments"}
          </span>
        </div>

        <div className="appointment-table-wrap">
          {loading ? (
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Project</th>
                  <th>Purpose</th>
                  <th>Type</th>
                  <th>Status / Details</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="skeleton skeleton-text"></div>
                    </td>
                    <td>
                      <div className="skeleton skeleton-text"></div>
                    </td>
                    <td>
                      <div className="skeleton skeleton-text"></div>
                    </td>
                    <td>
                      <div className="skeleton skeleton-text"></div>
                    </td>
                    <td>
                      <div className="skeleton skeleton-text short"></div>
                    </td>
                    <td>
                      <div className="skeleton skeleton-text long"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Project</th>
                  <th>Purpose</th>
                  <th>Type</th>
                  <th>Status / Details</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="appointment-empty">
                      {activeTab === "upcoming"
                        ? "No upcoming appointments yet."
                        : "No past appointments yet."}
                    </td>
                  </tr>
                ) : (
                  appointments.map((a) => {
                    const typeLabel =
                      a.mode === "f2f" ? "Face-to-face" : "Online";

                    const detailsText = getStatusDetails(a);

                    return (
                      <tr key={a.id}>
                        <td>{a.date || ""}</td>
                        <td>{a.time || ""}</td>
                        <td>{a.project}</td>
                        <td>{a.purpose}</td>
                        <td>{typeLabel}</td>
                        <td>{detailsText}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="appointment-pagination">
          <button
            className="dash-btn ghost"
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>

          <span className="dash-item-meta appointment-page-meta">
            Page {page} of {totalPages}
          </span>

          <button
            className="dash-btn ghost"
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
