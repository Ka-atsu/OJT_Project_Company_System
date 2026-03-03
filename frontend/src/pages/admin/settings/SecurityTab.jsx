import React, { useState } from "react";
import Row from "./components/Row";
import Switch from "./components/Switch";

export default function SecurityTab() {
  const [twoFA, setTwoFA] = useState(true);
  const [reauth, setReauth] = useState(true);

  return (
    <div className="as-card">
      <Row
        label="Two-factor authentication"
        help="Recommended for all admin accounts."
        right={<Switch checked={twoFA} onChange={setTwoFA} />}
      />

      <Row
        label="Re-auth for sensitive actions"
        help="Require password confirmation."
        right={<Switch checked={reauth} onChange={setReauth} />}
      />

      <Row label="Password" right={<button>Change</button>} />
    </div>
  );
}
