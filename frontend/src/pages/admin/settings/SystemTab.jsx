import React, { useState } from "react";
import Row from "./components/Row";
import Switch from "./components/Switch";

export default function SystemTab() {
  const [maintenance, setMaintenance] = useState(false);
  const [selfReschedule, setSelfReschedule] = useState(true);
  const [duration, setDuration] = useState(30);

  return (
    <div className="as-card">
      <Row
        label="Maintenance mode"
        right={<Switch checked={maintenance} onChange={setMaintenance} />}
      />

      <Row
        label="Allow client self-reschedule"
        right={<Switch checked={selfReschedule} onChange={setSelfReschedule} />}
      />

      <Row
        label="Default meeting duration"
        right={
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={15}>15 mins</option>
            <option value={30}>30 mins</option>
            <option value={45}>45 mins</option>
            <option value={60}>60 mins</option>
          </select>
        }
      />
    </div>
  );
}
