import { useState } from "react";
import BookAppointment from "./BookAppointment";
import "./appointment.css";

export default function Appointment() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [open, setOpen] = useState(false);

  const appointments = [
    {
      date: "Jan 21, 2026",
      time: "11:00 AM",
      project: "Random Building",
      purpose: "Contract",
    },
    {
      date: "Jan 28, 2026",
      time: "11:00 AM",
      project: "Random Building",
      purpose: "Documents",
    },
    {
      date: "Jan 29, 2026",
      time: "11:00 AM",
      project: "Random Building",
      purpose: "Planning",
    },
  ];

  return (
    <section className="appointment-page">
      {/* THIS IS THE “CALL” */}
      {open && <BookAppointment onClose={() => setOpen(false)} />}

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

      {/* Tabs */}
      <div className="appointment-tabs">
        <button
          className={`appointment-tab dash-btn ghost ${activeTab === "upcoming" ? "is-active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
          type="button"
        >
          Upcoming
        </button>

        <button
          className={`appointment-tab dash-btn ghost ${activeTab === "past" ? "is-active" : ""}`}
          onClick={() => setActiveTab("past")}
          type="button"
        >
          Past
        </button>
      </div>

      {/* Table */}
      <div className="dash-surface">
        <div className="dash-surface-header">
          <span>
            {activeTab === "upcoming"
              ? "Upcoming appointments"
              : "Past appointments"}
          </span>
        </div>

        <div className="appointment-table-wrap">
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Project</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i}>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.project}</td>
                  <td>{a.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="appointment-pagination">
          <span className="dash-item-meta">1 2 3 … 67 68</span>
        </div>
      </div>
    </section>
  );
}
