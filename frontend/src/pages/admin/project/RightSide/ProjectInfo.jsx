import { Field } from "../adminProjectsUi";
import { PSTATUS } from "../projects.services";

export default function ProjectInfo({
  draft,
  isCreating,
  loading,
  onCancel,
  onSave,
  setDraft,
}) {
  return (
    <div className="ap-block">
      <div className="ap-block__top">
        <h3 className="ap-h3">
          {isCreating ? "Create project" : "Project info"}
        </h3>

        <div className="ap-block__actions">
          {isCreating && (
            <button
              className="ap-btn ap-btn--ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button
            className="ap-btn ap-btn--primary"
            onClick={onSave}
            disabled={loading}
          >
            {isCreating ? "Create" : "Save"}
          </button>
        </div>
      </div>

      <div className="ap-twoCol">
        {/* Editable Project name */}
        <Field label="Project name">
          <input
            value={draft.name || ""} // Ensure default value is empty if no name
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} // Update name
            disabled={loading} // Disable if loading
          />
        </Field>

        {/* Editable Status */}
        <Field label="Status">
          <select
            value={draft.status || "draft"}
            onChange={(e) =>
              setDraft((d) => ({ ...d, status: e.target.value }))
            }
            disabled={loading} // Disable if loading
          >
            {Object.entries(PSTATUS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        {/* Editable Start date */}
        <Field label="Start date">
          <input
            type="date"
            value={draft.startDate || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, startDate: e.target.value }))
            } // Update start date
            disabled={loading} // Disable if loading
          />
        </Field>

        {/* Editable Due date */}
        <Field label="Due date">
          <input
            type="date"
            value={draft.dueDate || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, dueDate: e.target.value }))
            } // Update due date
            disabled={loading} // Disable if loading
          />
        </Field>
      </div>
    </div>
  );
}
