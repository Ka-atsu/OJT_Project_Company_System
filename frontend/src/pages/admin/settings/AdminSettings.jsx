import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./adminSettings";

import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import SystemTab from "./SystemTab";

import "./admin-settings.css";

const TABS = [
  { key: "profile", label: "My Profile" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "system", label: "System" },
];

export default function AdminSettings() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setAdmin(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!admin) return <div>Not authenticated</div>;

  return (
    <div className="as">
      <h1 className="as-title">Account Settings</h1>

      <nav className="as-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`as-tab ${tab === t.key ? "is-active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "profile" && <ProfileTab admin={admin} setAdmin={setAdmin} />}

      {tab === "security" && <SecurityTab />}

      {tab === "notifications" && <NotificationsTab />}

      {tab === "system" && <SystemTab />}
    </div>
  );
}
