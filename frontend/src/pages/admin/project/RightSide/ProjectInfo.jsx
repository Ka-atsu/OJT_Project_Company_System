import { Field } from "../adminProjectsUi";
import { PSTATUS } from "../projects.services";

export default function ProjectInfo({
  draft,
  isCreating,
  loading,
  onCancel,
  onSave,
  onDelete,
  setDraft,
}) {
  const isInvalidDate =
    draft.startDate && draft.dueDate && draft.dueDate < draft.startDate;

  const isFormInvalid =
    !draft.name?.trim() || !draft.startDate || !draft.dueDate || isInvalidDate;

  const handleDelete = () => {
    if (!draft?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone.",
    );

    if (confirmDelete) {
      onDelete?.(draft.id);
    }
  };

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

          {!isCreating && draft?.id && (
            <button
              className="ap-btn ap-btn--danger"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          )}

          <button
            className="ap-btn ap-btn--primary"
            onClick={onSave}
            disabled={loading || isFormInvalid}
          >
            {isCreating ? "Create" : "Save"}
          </button>
        </div>
      </div>

      <div className="ap-twoCol">
        <Field label="Project name">
          <input
            value={draft.name || ""}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            disabled={loading}
          />
        </Field>

        <Field label="Status">
          <select
            value={draft.status ?? "draft"}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                status: e.target.value,
              }))
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
          <input
            type="date"
            value={draft.startDate || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, startDate: e.target.value }))
            }
            disabled={loading}
          />
        </Field>

        <Field label="Due date">
          <input
            type="date"
            value={draft.dueDate || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, dueDate: e.target.value }))
            }
            disabled={loading}
          />
        </Field>

        <Field label="Address">
          <input
            value={draft.address || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, address: e.target.value }))
            }
            disabled={loading}
          />
        </Field>

        <Field label="Budget">
          <input
            type="number"
            value={draft.budget || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, budget: e.target.value }))
            }
            disabled={loading}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={draft.description || ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, description: e.target.value }))
            }
            disabled={loading}
          />
        </Field>
      </div>
    </div>
  );
}
