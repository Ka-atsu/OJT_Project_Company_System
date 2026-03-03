import React, { useState } from "react";
import Row from "./components/Row";
import Switch from "./components/Switch";

export default function NotificationsTab() {
  const [appointments, setAppointments] = useState(true);
  const [projects, setProjects] = useState(true);
  const [messages, setMessages] = useState(false);
  const [weekly, setWeekly] = useState(true);

  return (
    <div className="as-card">
      <Row
        label="Appointment requests"
        right={<Switch checked={appointments} onChange={setAppointments} />}
      />

      <Row
        label="Project updates"
        right={<Switch checked={projects} onChange={setProjects} />}
      />

      <Row
        label="Client messages"
        right={<Switch checked={messages} onChange={setMessages} />}
      />

      <Row
        label="Weekly digest"
        right={<Switch checked={weekly} onChange={setWeekly} />}
      />
    </div>
  );
}
