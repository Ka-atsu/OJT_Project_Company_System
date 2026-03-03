import React, { useState } from "react";
import Row from "./components/Row";
import Switch from "./components/Switch";
import { updatePassword } from "./admin.Settings";

export default function SecurityTab() {
  const [twoFA, setTwoFA] = useState(true);
  const [reauth, setReauth] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updatePassword(form);

      setSuccess("Password updated successfully.");
      setForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="as-card">
      <div className="as-card__inner">
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

        <Row
          label="Password"
          help="Change your account password."
          right={
            <button className="as-btn" onClick={() => setShowForm(!showForm)}>
              Change
            </button>
          }
        />

        {showForm && (
          <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
            <input
              className="as-input"
              type="password"
              name="current_password"
              placeholder="Current password"
              value={form.current_password}
              onChange={handleChange}
            />

            <input
              className="as-input"
              type="password"
              name="password"
              placeholder="New password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              className="as-input"
              type="password"
              name="password_confirmation"
              placeholder="Confirm new password"
              value={form.password_confirmation}
              onChange={handleChange}
            />

            {error && (
              <div style={{ color: "#dc2626", fontSize: 12 }}>{error}</div>
            )}

            {success && (
              <div style={{ color: "#16a34a", fontSize: 12 }}>{success}</div>
            )}

            <button
              className="as-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
