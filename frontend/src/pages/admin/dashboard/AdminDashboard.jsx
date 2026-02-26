// AdminDashboard.jsx
import React from "react";
import "./admin-dashboard.css";
import { useAdminDashboard } from "./useAdminDashboard";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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

/* =========================
   Recharts helpers
========================= */

const PIE_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

function toPieData(obj, labelMap = {}) {
  if (!obj) return [];
  return Object.entries(obj).map(([k, v]) => ({
    name: labelMap[k] ?? k,
    value: Number(v ?? 0),
    key: k,
  }));
}

function toBarDataMonthly(points = []) {
  return (points || []).map((p) => ({
    month: (p.month || "").slice(5), // "YYYY-MM" -> "MM"
    count: Number(p.count ?? 0),
  }));
}

function EmptyChart({ text = "No data" }) {
  return <div className="ad-muted ad-small">{text}</div>;
}

function PieBlock({ title, data }) {
  const has = (data || []).some((d) => d.value > 0);
  return (
    <div className="ad-chartBlock">
      <div className="ad-chartTitle">{title}</div>
      <div className="ad-chartArea">
        {has ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </div>
    </div>
  );
}

function BarBlock({ title, data }) {
  const has = (data || []).some((d) => d.count > 0);
  return (
    <div className="ad-chartBlock">
      <div className="ad-chartTitle">{title}</div>
      <div className="ad-chartArea">
        {has ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, loading, err, refresh } = useAdminDashboard();

  const appointments = data?.appointments ?? [];
  const projects = data?.projects ?? [];
  const documents = data?.documents ?? [];
  const activity = data?.activity ?? [];

  const pendingCount = data?.kpis?.pendingCount ?? 0;
  const activeCount = data?.kpis?.activeCount ?? 0;
  const docsNew = data?.kpis?.docsNew ?? 0;
  const milestonesDue = data?.kpis?.milestonesDue ?? 0;

  // ✅ chart series
  const apptPie = toPieData(data?.charts?.appointmentsByStatus, {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  });

  const projPie = toPieData(data?.charts?.projectsByStatus, {
    active: "Active",
    on_hold: "On hold",
    completed: "Completed",
    draft: "Draft",
  });

  const docsBars = toBarDataMonthly(data?.charts?.documentsMonthly);

  const go = (path) => {
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

          {loading ? (
            <div className="ad-muted ad-small">Loading dashboard…</div>
          ) : null}

          {err ? (
            <div
              className="ad-small"
              style={{ color: "crimson", marginTop: 6 }}
            >
              {err}{" "}
              <button
                className="ad-btn ad-btn--ghost"
                type="button"
                onClick={() => refresh()}
              >
                Retry
              </button>
            </div>
          ) : null}
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

        {/* Charts row (Recharts) */}
        <section className="ad-row ad-row--charts">
          <Card title="Overview charts" meta="Quick distribution">
            <div className="ad-chartsGrid">
              <PieBlock title="Appointments status" data={apptPie} />
              <PieBlock title="Projects status" data={projPie} />
              <BarBlock
                title="Documents uploaded (last 6 months)"
                data={docsBars}
              />
            </div>
          </Card>
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

              {!loading && appointments.length === 0 ? (
                <div className="ad-muted ad-small">No appointments found.</div>
              ) : null}
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

              {!loading && projects.length === 0 ? (
                <div className="ad-muted ad-small">No projects found.</div>
              ) : null}
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

                  {!loading && documents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="ad-muted ad-small">
                        No documents found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Activity" meta="Latest actions">
            <div className="ad-scroll">
              {activity.length ? (
                activity.map((x, idx) => (
                  <div key={idx} className="ad-activity">
                    <div className="ad-activity__when">{x.when}</div>
                    <div className="ad-activity__text">{x.text}</div>
                  </div>
                ))
              ) : !loading ? (
                <div className="ad-muted ad-small">No recent activity.</div>
              ) : null}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
