import { useEffect, useState, useCallback } from "react";
import BookAppointment from "./BookAppointment";
import { listAppointments, createAppointment } from "./appointments.service";
import "./appointment.css";

export default function Appointment() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [open, setOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listAppointments({
        status: activeTab,
        page,
        limit,
      });

      setAppointments(res.data);
      setTotalPages(res.totalPages || 1);

      if (page > (res.totalPages || 1)) setPage(res.totalPages || 1);
    } finally {
      setLoading(false);
    }
  }, [activeTab, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <section className="appointment-page">
      {open && (
        <BookAppointment
          onClose={() => setOpen(false)}
          onSubmit={async (payload) => {
            await createAppointment(payload);
            setPage(1);
            await load();
          }}
        />
      )}

      <header className="appointment-header">
        <h1 className="dash-title">Appointments</h1>
        <p className="dash-subtitle">Manage schedule and consultations.</p>
      </header>

      <div className="appointment-actions">
        <button
          className="dash-btn primary"
          type="button"
          onClick={() => setOpen(true)}
        >
          + Schedule New Appointment
        </button>
      </div>

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
            <div className="appointment-loading">Loading…</div>
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

                    let detailsText = "";
                    if (a.approvalStatus === "pending") {
                      detailsText =
                        "Pending — admin will confirm and send details.";
                    } else if (a.approvalStatus === "declined") {
                      detailsText = "Declined.";
                    } else {
                      if (a.mode === "online") {
                        detailsText = a.meetingLink
                          ? `Link: ${a.meetingLink}`
                          : "Accepted — meeting link to be provided.";
                      } else {
                        detailsText = a.location
                          ? `Location: ${a.location}`
                          : "Accepted — location to be provided.";
                      }
                    }

                    return (
                      <tr key={a.id}>
                        <td>{a.date}</td>
                        <td>{a.time}</td>
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
