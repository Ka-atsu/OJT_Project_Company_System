import ProjectInfo from "./RightSide/ProjectInfo";
import ProjectPhotos from "./RightSide/ProjectPhotos";
import ClientAssign from "./RightSide/ClientAssign";
import Milestones from "./RightSide/Milestones";

export default function ProjectDetails({
  isCreating,
  selected,
  draft,
  loading,
  showing,
  cancelCreate,
  saveProject,
  clientQuery,
  setClientQuery,
  filteredClients,
  applyClient,
  addMilestone,
  updateMilestone,
  removeMilestone,
  setDraft,
  setItems,
}) {
  // When in create new project mode, show the new project form
  if (isCreating) {
    return (
      <section className="ap-card floating-card">
        <div className="ap-card__header">
          <h2 className="ap-card__title">Create New Project</h2>
        </div>

        {/* Project Info Section */}
        <ProjectInfo
          draft={draft}
          isCreating={isCreating}
          loading={loading}
          onCancel={cancelCreate}
          onSave={saveProject}
          setDraft={setDraft}
        />

        {/* Client Assign Section */}
        <ClientAssign
          draft={draft}
          loading={loading}
          clientQuery={clientQuery}
          setClientQuery={setClientQuery}
          filteredClients={filteredClients}
          applyClient={applyClient}
        />

        {/* Project Photos Section */}
        <ProjectPhotos
          draft={draft}
          isCreating={isCreating}
          loading={loading}
          setDraft={setDraft}
          setItems={setItems}
        />

        {/* Milestones Section */}
        <Milestones
          milestones={draft.milestones || []}
          loading={loading}
          onAdd={addMilestone}
          onUpdate={updateMilestone}
          onRemove={removeMilestone}
        />
      </section>
    );
  }

  // If not creating, show the selected project's details
  if (selected) {
    return (
      <section className="ap-card">
        <div className="ap-card__header">
          <h2 className="ap-card__title">Project Details</h2>
        </div>

        <div className="ap-details">
          {/* Project Info Section */}
          <ProjectInfo
            draft={draft}
            isCreating={isCreating}
            loading={loading}
            onCancel={cancelCreate}
            onSave={saveProject}
            setDraft={setDraft}
          />

          {/* Client Assign Section */}
          <ClientAssign
            draft={draft}
            loading={loading}
            clientQuery={clientQuery}
            setClientQuery={setClientQuery}
            filteredClients={filteredClients}
            applyClient={applyClient}
          />

          {/* Project Photos Section */}
          <ProjectPhotos
            draft={draft}
            selected={selected}
            isCreating={isCreating}
            loading={loading}
            setDraft={setDraft}
            setItems={setItems}
          />

          {/* Milestones Section */}
          <Milestones
            milestones={draft.milestones}
            loading={loading}
            onAdd={addMilestone}
            onUpdate={updateMilestone}
            onRemove={removeMilestone}
          />
        </div>
      </section>
    );
  }

  // Fallback UI when no project is selected
  return (
    <section className="ap-card">
      <div className="ap-card__header">
        <h2 className="ap-card__title">Details</h2>
      </div>
      <div className="ap-empty">
        Select a project on the left, or click “New”.
      </div>
    </section>
  );
}
