import "./admin-projects.css";
import useAdminProjects from "./useAdminProjects";
import AdminProjectsList from "./adminProjectsList";
import ProjectDetails from "./ProjectDetails";

export default function AdminProjects() {
  const state = useAdminProjects();

  // Ensure items is null during first load
  const safeState = {
    ...state,
    items: state.items === undefined ? null : state.items,
  };

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
        <AdminProjectsList
          {...safeState}
          onNew={state.startCreate}
          onSelect={state.setSelectedId}
        />

        <ProjectDetails {...safeState} />
      </main>
    </div>
  );
}
