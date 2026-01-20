import { useState } from "react";
import "../../css/appointment.css"
export default function Appointment() {
  const [activeTab, setActiveTab] = useState("upcoming");

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="appointment-container">
      <header className="appointment-header">
        <h1 className="appointment-title">Appointment</h1>
        <p className="appointment-description">
          Manage schedule and other consultation
        </p>
      </header>

      {/* Tabs */}
      <div className="appointment-tabs">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => handleTabChange("past")}
        >
          Past
        </button>
      </div>

      {/* Table */}
      <div className="appointment-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Project</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.project}</td>
                <td>{appointment.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="appointment-pagination">
        <span>1 2 3 ... 67 68</span>
      </div>

      {/* Add new appointment button */}
      <div className="add-appointment">
        <button className="btn-add">+ Schedule New Appointment</button>
      </div>
    </section>
  );
}
