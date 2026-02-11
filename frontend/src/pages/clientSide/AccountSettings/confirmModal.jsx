import "./confirmModal.css";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="confirmModal-backdrop">
      <div className="confirmModal-card">
        <h3 className="confirmModal-title">{title}</h3>
        <p className="confirmModal-message">{message}</p>

        <div className="confirmModal-actions">
          <button className="btn-outline" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
