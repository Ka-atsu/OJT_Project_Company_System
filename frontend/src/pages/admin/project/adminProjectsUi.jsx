import React from "react";
import { PSTATUS } from "./projects.services";

export function Badge({ tone = "muted", children }) {
  return <span className={`ap-badge ap-badge--${tone}`}>{children}</span>;
}

export function StatusBadge({ status }) {
  const tone =
    status === "active"
      ? "success"
      : status === "completed"
        ? "primary"
        : status === "on_hold"
          ? "warning"
          : "muted";

  return <Badge tone={tone}>{PSTATUS[status] ?? status}</Badge>;
}

export function Field({ label, children }) {
  return (
    <label className="ap-field">
      <span className="ap-field__label">{label}</span>
      {children}
    </label>
  );
}
