// ProjectInfo.jsx
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
        <Field label="Project name">
          <input value={draft.name} readOnly />
        </Field>

        <Field label="Status">
          <select
            value={draft.status || "draft"}
            onChange={(e) =>
              setDraft((d) => ({ ...d, status: e.target.value }))
            }
            disabled={loading}
          >
            {Object.entries(PSTATUS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Start date">
          <input type="date" value={draft.startDate || ""} readOnly />
        </Field>

        <Field label="Due date">
          <input type="date" value={draft.dueDate || ""} readOnly />
        </Field>
      </div>
    </div>
  );
}
