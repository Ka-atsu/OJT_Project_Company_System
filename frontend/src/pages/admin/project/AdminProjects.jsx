import "./admin-projects.css";
import useAdminProjects from "./useAdminProjects"; // The hook that manages project state
import AdminProjectsList from "./AdminProjectsList";
import ProjectDetails from "./ProjectDetails";

export default function AdminProjects() {
  const state = useAdminProjects(); // Hook that manages all the project-related states

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
        {/* Pass onNew to AdminProjectsList to trigger new project creation */}
        <AdminProjectsList
          {...state} // Spread the state to pass necessary values and handlers
          onNew={state.startCreate} // Call startCreate from useAdminProjects directly
          onSelect={state.setSelectedId} // Select a project by updating selectedId
        />
        {/* Pass the same state to ProjectDetails to display details or new project form */}
        <ProjectDetails {...state} />
      </main>
    </div>
  );
}
