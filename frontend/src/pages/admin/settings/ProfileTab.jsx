import React, { useState, useEffect } from "react";
import { updateUserProfile } from "./admin.Settings";
import Row from "./components/Row";

export default function ProfileTab({ admin, setAdmin }) {
  const [name, setName] = useState(admin.name);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setName(admin.name);
  }, [admin.name]);

  async function save() {
    try {
      const updated = await updateUserProfile({ name });
      setAdmin(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="as-card">
      <Row
        label="Name"
        help="This name is used across the admin portal."
        right={
          editing ? (
            <div className="as-actions">
              <button
                className="as-btn as-btn--ghost"
                onClick={() => {
                  setName(admin.name);
                  setEditing(false);
                }}
              >
                Cancel{" "}
              </button>

              <button
                className="as-btn"
                onClick={save}
                disabled={name.trim() === admin.name}
              >
                Save
              </button>
            </div>
          ) : (
            <button className="as-btn" onClick={() => setEditing(true)}>
              Edit
            </button>
          )
        }
      >
        {editing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <div>{admin.name}</div>
        )}
      </Row>

      <Row
        label="Email"
        help="Used for login and notifications."
        right={<span>{admin.email}</span>}
      />

      <Row label="Role" right={<span>{admin.role ?? "Administrator"}</span>} />

      <Row
        label="Organization"
        right={<span>{admin.organization ?? "Cliberduche Corporation"}</span>}
      />
    </div>
  );
}
