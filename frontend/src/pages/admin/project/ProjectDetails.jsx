// ProjectDetails.jsx
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
  if (!isCreating && !selected) {
    return (
      <section className="ap-card">
        <div className="ap-card__header">
          <h2 className="ap-card__title">Details</h2>
          <div className="ap-card__meta">{showing}</div>
        </div>
        <div className="ap-empty">
          Select a project on the left, or click “New”.
        </div>
      </section>
    );
  }

  return (
    <section className="ap-card">
      <div className="ap-card__header">
        <h2 className="ap-card__title">Details</h2>
        <div className="ap-card__meta">{showing}</div>
      </div>

      <div className="ap-details">
        <ClientAssign
          draft={draft}
          loading={loading}
          clientQuery={clientQuery}
          setClientQuery={setClientQuery}
          filteredClients={filteredClients}
          applyClient={applyClient}
        />

        <ProjectInfo
          draft={draft}
          isCreating={isCreating}
          loading={loading}
          onCancel={cancelCreate}
          onSave={saveProject}
          setDraft={setDraft}
        />

        <ProjectPhotos
          draft={draft}
          selected={selected}
          isCreating={isCreating}
          loading={loading}
          setDraft={setDraft}
          setItems={setItems}
        />

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
