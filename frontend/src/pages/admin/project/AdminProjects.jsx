// AdminProjects.jsx
import "./admin-projects.css";
import useAdminProjects from "./useAdminProjects";
import AdminProjectsList from "./AdminProjectsList";
import ProjectDetails from "./ProjectDetails";

export default function AdminProjects() {
  const state = useAdminProjects();

  return (
    <div className="ap">
      <header className="ap-header">
        <div>
          <h1 className="ap-title">Manage Projects</h1>
          <p className="ap-sub">
            Create/edit projects, assign clients, update milestones.
          </p>
        </div>
      </header>

      <main className="ap-grid">
        <AdminProjectsList {...state} />
        <ProjectDetails {...state} />
      </main>
    </div>
  );
}
