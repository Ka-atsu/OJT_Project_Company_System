import React, { useMemo, useState } from "react";
import "./admin-settings.css";

const TABS = [
  { key: "profile", label: "My Profile" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "system", label: "System" },
];

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`as-switch ${checked ? "is-on" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    />
  );
}

function Row({ label, help, right, children }) {
  return (
    <div className="as-row">
      <div className="as-row__left">
        <div className="as-row__label">{label}</div>
        {help ? <div className="as-row__help">{help}</div> : null}
        {children}
      </div>
      <div className="as-row__right">{right}</div>
    </div>
  );
}

export default function AdminSettings() {
  // Replace with real admin data later
  const admin = useMemo(
    () => ({
      name: "Warly France Jaculan",
      displayName: "warly",
      email: "jaculangithub@gmail.com",
      role: "Administrator",
      org: "Cliberduche Corporation",
    }),
    [],
  );

  const [tab, setTab] = useState("profile");

  // Profile edit
  const [isEditingDisplay, setIsEditingDisplay] = useState(false);
  const [displayName, setDisplayName] = useState(admin.displayName);

  // Security toggles (demo state)
  const [twoFA, setTwoFA] = useState(true);
  const [reauthSensitive, setReauthSensitive] = useState(true);

  // Notifications (demo state)
  const [nAppointments, setNAppointments] = useState(true);
  const [nProjects, setNProjects] = useState(true);
  const [nClientMessages, setNClientMessages] = useState(false);
  const [nWeeklyDigest, setNWeeklyDigest] = useState(true);

  // System options (demo state)
  const [maintenance, setMaintenance] = useState(false);
  const [allowSelfResched, setAllowSelfResched] = useState(true);
  const [defaultMeetingMins, setDefaultMeetingMins] = useState(30);

  function saveDisplayName() {
    // hook to API later
    setIsEditingDisplay(false);
  }

  return (
    <div className="as">
      <header className="as-header">
        <h1 className="as-title">Account Settings</h1>
      </header>

      <nav className="as-tabs" aria-label="Settings tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`as-tab ${tab === t.key ? "is-active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="as-card">
        {tab === "profile" ? (
          <div className="as-card__inner">
            <Row
              label="Name"
              right={<span className="as-value">{admin.name}</span>}
            />
            <div className="as-divider" />

            <Row
              label="Display Name"
              help="This name is used across the admin portal."
              right={
                isEditingDisplay ? (
                  <div className="as-actions">
                    <button
                      className="as-btn as-btn--ghost"
                      type="button"
                      onClick={() => {
                        setDisplayName(admin.displayName);
                        setIsEditingDisplay(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="as-btn"
                      type="button"
                      onClick={saveDisplayName}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    className="as-btn"
                    type="button"
                    onClick={() => setIsEditingDisplay(true)}
                  >
                    Edit
                  </button>
                )
              }
            >
              {isEditingDisplay ? (
                <input
                  className="as-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display name"
                />
              ) : (
                <div className="as-value as-mono">{displayName}</div>
              )}
            </Row>

            <div className="as-divider" />
            <Row
              label="Email"
              help="Used for login and important notifications."
              right={<span className="as-value as-mono">{admin.email}</span>}
            />
            <div className="as-divider" />
            <Row
              label="Role"
              right={<span className="as-value">{admin.role}</span>}
            />
            <div className="as-divider" />
            <Row
              label="Organization"
              right={<span className="as-value">{admin.org}</span>}
            />
          </div>
        ) : null}

        {tab === "security" ? (
          <div className="as-card__inner">
            <Row
              label="Two-factor authentication"
              help="Recommended for all admin accounts."
              right={
                <Switch
                  checked={twoFA}
                  onChange={setTwoFA}
                  label="Two-factor authentication"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Re-auth for sensitive actions"
              help="Require password confirmation for critical actions."
              right={
                <Switch
                  checked={reauthSensitive}
                  onChange={setReauthSensitive}
                  label="Re-auth for sensitive actions"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Password"
              help="Change your admin password."
              right={
                <button
                  className="as-btn"
                  type="button"
                  onClick={() => alert("Hook to change password modal")}
                >
                  Change
                </button>
              }
            />
            <div className="as-divider" />

            <Row
              label="Active sessions"
              help="View and revoke logged-in devices."
              right={
                <button
                  className="as-btn as-btn--ghost"
                  type="button"
                  onClick={() => alert("Hook to sessions panel")}
                >
                  Manage
                </button>
              }
            />
            <div className="as-divider" />

            <Row
              label="Danger zone"
              help="Be careful—these actions affect access."
              right={
                <button
                  className="as-btn as-btn--danger"
                  type="button"
                  onClick={() => alert("Hook to deactivate flow")}
                >
                  Deactivate account
                </button>
              }
            />
          </div>
        ) : null}

        {tab === "notifications" ? (
          <div className="as-card__inner">
            <Row
              label="Appointment requests"
              help="Notify when a new appointment is requested."
              right={
                <Switch
                  checked={nAppointments}
                  onChange={setNAppointments}
                  label="Appointment requests"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Project updates"
              help="Notify on project status or milestone changes."
              right={
                <Switch
                  checked={nProjects}
                  onChange={setNProjects}
                  label="Project updates"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Client messages"
              help="Notify when clients send a message."
              right={
                <Switch
                  checked={nClientMessages}
                  onChange={setNClientMessages}
                  label="Client messages"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Weekly digest"
              help="Receive a summary every week."
              right={
                <Switch
                  checked={nWeeklyDigest}
                  onChange={setNWeeklyDigest}
                  label="Weekly digest"
                />
              }
            />
          </div>
        ) : null}

        {tab === "system" ? (
          <div className="as-card__inner">
            <Row
              label="Maintenance mode"
              help="Temporarily disable client portal actions."
              right={
                <Switch
                  checked={maintenance}
                  onChange={setMaintenance}
                  label="Maintenance mode"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Allow client self-reschedule"
              help="If enabled, clients can request reschedule from the portal."
              right={
                <Switch
                  checked={allowSelfResched}
                  onChange={setAllowSelfResched}
                  label="Allow client self-reschedule"
                />
              }
            />
            <div className="as-divider" />

            <Row
              label="Default meeting duration"
              help="Used when creating appointments by default."
              right={
                <select
                  className="as-select"
                  value={defaultMeetingMins}
                  onChange={(e) =>
                    setDefaultMeetingMins(Number(e.target.value))
                  }
                >
                  <option value={15}>15 mins</option>
                  <option value={30}>30 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>60 mins</option>
                </select>
              }
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
