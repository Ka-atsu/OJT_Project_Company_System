import { Badge } from "../adminProjectsUi";
import { MSTATUS } from "../projects.services";

export default function Milestones({
  milestones = [],
  loading,
  onAdd,
  onUpdate,
  onRemove,
}) {
  return (
    <div className="ap-block">
      <div className="ap-block__top">
        <h3 className="ap-h3">Milestones</h3>
        <button
          className="ap-btn ap-btn--ghost"
          onClick={onAdd}
          disabled={loading}
        >
          + Add milestone
        </button>
      </div>

      {milestones.length === 0 ? (
        <div className="ap-muted ap-small">No milestones yet.</div>
      ) : (
        <div className="ap-milestones">
          {milestones.map((m) => (
            <div key={m.id} className="ap-ms">
              <div className="ap-ms__row">
                <input
                  className="ap-ms__title"
                  value={m.title}
                  onChange={(e) => onUpdate(m.id, { title: e.target.value })}
                />

                <select
                  className="ap-ms__status"
                  value={m.status}
                  onChange={(e) => onUpdate(m.id, { status: e.target.value })}
                >
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                </select>

                <button
                  className="ap-ms__del"
                  type="button"
                  onClick={() => onRemove(m.id)}
                >
                  ✕
                </button>
              </div>

              <div className="ap-ms__row ap-ms__row--meta">
                <input
                  type="date"
                  value={m.due || ""}
                  onChange={(e) => onUpdate(m.id, { due: e.target.value })}
                />

                <Badge tone={m.status === "done" ? "success" : "muted"}>
                  {MSTATUS[m.status]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
