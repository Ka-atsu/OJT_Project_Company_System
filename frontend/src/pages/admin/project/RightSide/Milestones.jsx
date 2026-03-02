import { MSTATUS } from "../projects.services";

function statusColor(status) {
  if (status === "done") return "ms--done";
  if (status === "doing") return "ms--doing";
  return "ms--todo";
}

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
        <div className="ms-list">
          {milestones.map((m, index) => (
            <div key={m.id} className={`ms-card ${statusColor(m.status)}`}>
              <div className="ms-left">
                <div className="ms-index">{index + 1}</div>
              </div>

              <div className="ms-body">
                <div className="ms-top">
                  <input
                    className="ms-title"
                    value={m.title}
                    onChange={(e) => onUpdate(m.id, { title: e.target.value })}
                  />

                  <select
                    className="ms-status"
                    value={m.status}
                    onChange={(e) => onUpdate(m.id, { status: e.target.value })}
                  >
                    <option value="todo">To do</option>
                    <option value="doing">In progress</option>
                    <option value="done">Done</option>
                  </select>

                  <button className="ms-delete" onClick={() => onRemove(m.id)}>
                    ✕
                  </button>
                </div>

                <div className="ms-meta">
                  <input
                    type="date"
                    value={m.due || ""}
                    onChange={(e) => onUpdate(m.id, { due: e.target.value })}
                  />

                  <span className="ms-label">{MSTATUS[m.status]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
