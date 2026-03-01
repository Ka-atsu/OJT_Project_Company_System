import ProjectInfo from "./RightSide/ProjectInfo";
import ProjectPhotos from "./RightSide/ProjectPhotos";
import ClientAssign from "./RightSide/ClientAssign";
import Milestones from "./RightSide/Milestones";

/* Skeleton */
function ProjectDetailsSkeleton() {
  return (
    <>
      <div className="ap-card__header">
        <div
          className="ap-skeleton ap-skel-title"
          style={{ width: 200, height: 18 }}
        />
      </div>

      <div className="ap-details">
        <div className="ap-block">
          <div className="ap-skeleton ap-skel-title" style={{ width: "40%" }} />
          <div className="ap-skeleton ap-skel-text" style={{ width: "70%" }} />
          <div className="ap-skeleton ap-skel-text" style={{ width: "55%" }} />
          <div className="ap-skeleton" style={{ height: 90 }} />
        </div>

        <div className="ap-block">
          <div className="ap-skeleton ap-skel-title" style={{ width: "35%" }} />
          <div className="ap-skeleton ap-skel-text" style={{ width: "60%" }} />
        </div>

        <div className="ap-block">
          <div className="ap-skeleton ap-skel-title" style={{ width: "30%" }} />
          <div className="ap-photos">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="ap-photoWrap">
                <div
                  className="ap-skeleton"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ap-block">
          <div className="ap-skeleton ap-skel-title" style={{ width: "40%" }} />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="ap-ms">
              <div
                className="ap-skeleton ap-skel-text"
                style={{ width: "50%" }}
              />
              <div
                className="ap-skeleton ap-skel-text"
                style={{ width: "30%", marginTop: 8 }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ProjectDetails({
  isCreating,
  selected,
  draft,
  loading,
  cancelCreate,
  saveProject,
  deleteProject,
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
  const title = isCreating ? "Create New Project" : "Project Details";
  const cardClass = isCreating ? "ap-card floating-card" : "ap-card";

  return (
    <section className={cardClass}>
      {/* 1️⃣ FIRST: handle loading */}
      {loading ? (
        <ProjectDetailsSkeleton />
      ) : (
        <>
          {/* 2️⃣ THEN: handle empty state */}
          {!isCreating && !selected ? (
            <>
              <div className="ap-card__header">
                <h2 className="ap-card__title">Details</h2>
              </div>
              <div className="ap-empty">
                Select a project on the left, or click “New”.
              </div>
            </>
          ) : (
            <>
              <div className="ap-card__header">
                <h2 className="ap-card__title">{title}</h2>
              </div>

              <div className="ap-details">
                <ProjectInfo
                  draft={draft}
                  isCreating={isCreating}
                  loading={loading}
                  onCancel={cancelCreate}
                  onSave={saveProject}
                  onDelete={deleteProject}
                  setDraft={setDraft}
                />

                <ClientAssign
                  draft={draft}
                  loading={loading}
                  clientQuery={clientQuery}
                  setClientQuery={setClientQuery}
                  filteredClients={filteredClients}
                  applyClient={applyClient}
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
                  milestones={draft?.milestones || []}
                  loading={loading}
                  onAdd={addMilestone}
                  onUpdate={updateMilestone}
                  onRemove={removeMilestone}
                />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
