import React, { useMemo } from "react";
import "./admin-dashboard.css";

const A_STATUS = {
  pending: "Pending",
  approved: "Approved",
  rescheduled: "Rescheduled",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

const P_STATUS = {
  draft: "Draft",
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
};

function Badge({ kind = "muted", children }) {
  return <span className={`ad-badge ad-badge--${kind}`}>{children}</span>;
}

function StatusBadge({ status }) {
  const kind =
    status === "pending"
      ? "warning"
      : status === "approved"
        ? "success"
        : status === "rescheduled"
          ? "primary"
          : status === "rejected"
            ? "danger"
            : status === "cancelled"
              ? "muted"
              : "muted";
  return <Badge kind={kind}>{A_STATUS[status] ?? status}</Badge>;
}

function ProjectStatusBadge({ status }) {
  const kind =
    status === "active"
      ? "success"
      : status === "completed"
        ? "primary"
        : status === "on_hold"
          ? "warning"
          : "muted";
  return <Badge kind={kind}>{P_STATUS[status] ?? status}</Badge>;
}

function Card({ title, meta, actions, children }) {
  return (
    <section className="ad-card">
      <div className="ad-card__header">
        <div>
          <h2 className="ad-card__title">{title}</h2>
          {meta ? <div className="ad-card__meta">{meta}</div> : null}
        </div>
        {actions ? <div className="ad-card__actions">{actions}</div> : null}
      </div>
      <div className="ad-card__body">{children}</div>
    </section>
  );
}

/** ---- Fake data ---- */
function makeFakeAppointments(n = 14) {
  const clients = ["A. Santos", "J. Rivera", "K. Tan", "L. Reyes", "P. Cruz"];
  const types = ["Consultation", "Site Visit", "Project Update", "Support"];
  const statuses = [
    "pending",
    "pending",
    "approved",
    "rescheduled",
    "cancelled",
  ];

  const pad = (x) => String(x).padStart(2, "0");
  const out = [];
  for (let i = 0; i < n; i++) {
    const day = 1 + (i % 12);
    const hour = 9 + (i % 7);
    const status = statuses[i % statuses.length];
    const mode = i % 2 === 0 ? "Online" : "Face-to-face";
    out.push({
      id: `APT-${1000 + i}`,
      client: clients[i % clients.length],
      type: types[i % types.length],
      status,
      mode,
      requestedFor: `2026-02-${pad(day)} ${pad(hour)}:00`,
    });
  }
  return out;
}

function makeFakeProjects(n = 10) {
  const names = [
    "Land Development – Phase 1 (Clearing/Grading)",
    "Backfill Sourcing – Lot 7B",
    "Site Management – Safety + Workflow",
    "Equipment Leasing – Excavator Package",
    "Land Dev Support – Extension Scope",
  ];
  const statuses = ["active", "active", "on_hold", "draft", "completed"];

  const pad = (x) => String(x).padStart(2, "0");

  const out = [];
  for (let i = 0; i < n; i++) {
    const status = statuses[i % statuses.length];
    const progress =
      status === "completed"
        ? 100
        : status === "active"
          ? 35 + (i % 55)
          : status === "on_hold"
            ? 20 + (i % 25)
            : 5 + (i % 15);

    out.push({
      id: `PRJ-${1200 + i}`,
      name: names[i % names.length],
      status,
      client: ["A. Santos", "J. Rivera", "K. Tan", "L. Reyes"][i % 4],
      progress,
      nextMilestone: ["Mobilization", "Delivery", "Grading", "QA + Handover"][
        i % 4
      ],
      milestoneDue: `2026-02-${pad(5 + (i % 18))}`,
      updatedAt: `2026-01-${pad(10 + (i % 10))}`,
    });
  }
  return out;
}

function makeFakeDocuments(n = 10) {
  const files = [
    "Bill_of_Quantities.pdf",
    "Site_Photos.zip",
    "Delivery_Receipt.pdf",
    "Soil_Test_Report.pdf",
    "Project_Scope.docx",
  ];
  const clients = ["A. Santos", "J. Rivera", "K. Tan", "L. Reyes", "P. Cruz"];
  const status = ["new", "review", "approved", "new", "review"];

  const pad = (x) => String(x).padStart(2, "0");
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: `DOC-${2000 + i}`,
      file: files[i % files.length],
      client: clients[i % clients.length],
      type: ["PDF", "ZIP", "DOCX"][i % 3],
      uploadedAt: `2026-01-${pad(12 + (i % 10))}`,
      status: status[i % status.length],
      size: `${(1.2 + (i % 7) * 0.4).toFixed(1)} MB`,
    });
  }
  return out;
}

function makeFakeActivity() {
  return [
    { when: "Today 09:12", text: "Approved appointment APT-1004 (Online)." },
    { when: "Today 08:40", text: "Updated PRJ-1201 milestone due date." },
    { when: "Yesterday", text: "Uploaded Delivery_Receipt.pdf for J. Rivera." },
    { when: "Yesterday", text: "Created new project draft PRJ-1288." },
  ];
}
/** -------------------- */

export default function AdminDashboard() {
  const appointments = useMemo(() => makeFakeAppointments(16), []);
  const projects = useMemo(() => makeFakeProjects(12), []);
  const documents = useMemo(() => makeFakeDocuments(12), []);
  const activity = useMemo(() => makeFakeActivity(), []);

  const pendingCount = appointments.filter(
    (a) => a.status === "pending",
  ).length;
  const activeCount = projects.filter((p) => p.status === "active").length;
  const docsNew = documents.filter((d) => d.status === "new").length;

  // milestones due soon (within “about a week” in fake world)
  const milestonesDue = projects
    .filter((p) => p.status === "active")
    .slice(0, 4).length;

  const go = (path) => {
    // SPA-safe fallback without react-router dependency
    window.location.href = path;
  };

  return (
    <div className="ad" style={{ ["--ad-nav-h"]: "64px" }}>
      <header className="ad-header">
        <div>
          <h1 className="ad-title">Admin Dashboard</h1>
          <p className="ad-sub">
            Quick overview of appointments, projects, documents, and activity.
          </p>
        </div>

        <div className="ad-quick">
          <button
            className="ad-btn ad-btn--primary"
            type="button"
            onClick={() => go("/admin/appointments")}
          >
            Manage appointments
          </button>
          <button
            className="ad-btn"
            type="button"
            onClick={() => go("/admin/projects")}
          >
            Manage projects
          </button>
          <button
            className="ad-btn"
            type="button"
            onClick={() => go("/admin/documents")}
          >
            Manage documents
          </button>
          <button
            className="ad-btn ad-btn--ghost"
            type="button"
            onClick={() => go("/admin/settings")}
          >
            Settings
          </button>
        </div>
      </header>

      <main className="ad-grid">
        {/* KPI row */}
        <section className="ad-kpis">
          <div className="ad-kpi">
            <div className="ad-kpi__label">Pending appointments</div>
            <div className="ad-kpi__value">{pendingCount}</div>
            <div className="ad-kpi__hint">Needs action</div>
          </div>

          <div className="ad-kpi">
            <div className="ad-kpi__label">Active projects</div>
            <div className="ad-kpi__value">{activeCount}</div>
            <div className="ad-kpi__hint">In progress</div>
          </div>

          <div className="ad-kpi">
            <div className="ad-kpi__label">New documents</div>
            <div className="ad-kpi__value">{docsNew}</div>
            <div className="ad-kpi__hint">Recent uploads</div>
          </div>

          <div className="ad-kpi">
            <div className="ad-kpi__label">Milestones due soon</div>
            <div className="ad-kpi__value">{milestonesDue}</div>
            <div className="ad-kpi__hint">Check deadlines</div>
          </div>
        </section>

        {/* Row 2: Appointments + Projects */}
        <section className="ad-row ad-row--top">
          <Card
            title="Appointments queue"
            meta="Pending / upcoming"
            actions={
              <button
                className="ad-btn ad-btn--ghost"
                type="button"
                onClick={() => go("/admin/appointments")}
              >
                View all
              </button>
            }
          >
            <div className="ad-scroll">
              {appointments.slice(0, 10).map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="ad-item"
                  onClick={() => go(`/admin/appointments?select=${a.id}`)}
                >
                  <div className="ad-item__top">
                    <div className="ad-strong">{a.client}</div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="ad-muted ad-small">
                    <span className="ad-mono">{a.id}</span> • {a.type} •{" "}
                    <span className="ad-mono">{a.mode}</span>
                  </div>
                  <div className="ad-small ad-mono">{a.requestedFor}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card
            title="Active projects"
            meta="Progress + next milestone"
            actions={
              <button
                className="ad-btn ad-btn--ghost"
                type="button"
                onClick={() => go("/admin/projects")}
              >
                View all
              </button>
            }
          >
            <div className="ad-scroll">
              {projects
                .filter((p) => p.status !== "draft")
                .slice(0, 8)
                .map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="ad-proj"
                    onClick={() => go(`/admin/projects?select=${p.id}`)}
                  >
                    <div className="ad-proj__top">
                      <div className="ad-strong">{p.name}</div>
                      <ProjectStatusBadge status={p.status} />
                    </div>

                    <div className="ad-muted ad-small">
                      <span className="ad-mono">{p.id}</span> • {p.client}
                    </div>

                    <div className="ad-proj__meta">
                      <div className="ad-small">
                        Next:{" "}
                        <span className="ad-strong">{p.nextMilestone}</span>
                      </div>
                      <div className="ad-small ad-mono">{p.milestoneDue}</div>
                    </div>

                    <div className="ad-progress">
                      <div
                        className="ad-progress__bar"
                        style={{ width: `${p.progress || 0}%` }}
                      />
                    </div>
                  </button>
                ))}
            </div>
          </Card>
        </section>

        {/* Row 3: Documents + Activity */}
        <section className="ad-row ad-row--bottom">
          <Card
            title="Recent documents"
            meta="Latest uploads"
            actions={
              <button
                className="ad-btn ad-btn--ghost"
                type="button"
                onClick={() => go("/admin/documents")}
              >
                View all
              </button>
            }
          >
            <div className="ad-tableWrap">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.slice(0, 8).map((d) => (
                    <tr key={d.id}>
                      <td className="ad-mono">{d.file}</td>
                      <td>{d.client}</td>
                      <td className="ad-mono">{d.uploadedAt}</td>
                      <td>
                        <Badge
                          kind={
                            d.status === "new"
                              ? "warning"
                              : d.status === "approved"
                                ? "success"
                                : "muted"
                          }
                        >
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Activity" meta="Latest actions">
            <div className="ad-scroll">
              {activity.map((x, idx) => (
                <div key={idx} className="ad-activity">
                  <div className="ad-activity__when">{x.when}</div>
                  <div className="ad-activity__text">{x.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
