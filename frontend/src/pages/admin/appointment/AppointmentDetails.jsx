function Badge({ status }) {
  return <span className={`aa-badge aa-badge--${status}`}>{status}</span>;
}

function Field({ label, children }) {
  return (
    <label className="aa-field">
      <span className="aa-field__label">{label}</span>
      {children}
    </label>
  );
}

export default function AppointmentDetails({
  selected,
  meetingLink,
  setMeetingLink,
  meetingLocation,
  setMeetingLocation,
  meetingNotes,
  setMeetingNotes,
  actionNote,
  setActionNote,
  newDateTime,
  setNewDateTime,
  approve,
  reject,
  cancel,
  reschedule,
}) {
  if (!selected) {
    return (
      <section className="aa-card">
        <div className="aa-empty">Select an appointment on the left.</div>
      </section>
    );
  }

  return (
    <section className="aa-card">
      <div className="aa-card__header">
        <h2 className="aa-card__title">Details</h2>
        <div className="aa-card__meta">{selected.id}</div>
      </div>

      <div className="aa-details">
        <div className="aa-block">
          <div className="aa-strong">{selected.client}</div>
          <div className="aa-muted">{selected.email}</div>

          <div className="aa-kv">
            <div className="aa-k">Status</div>
            <div className="aa-v">
              <Badge status={selected.status} />
            </div>

            <div className="aa-k">Meeting type</div>
            <div className="aa-v">
              {selected.mode === "online" ? "Online" : "Face-to-face"}
            </div>
          </div>
        </div>

        <div className="aa-block">
          <h3 className="aa-h3">Meeting details</h3>

          {selected.mode === "online" ? (
            <Field label="Meeting link">
              <input
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            </Field>
          ) : (
            <Field label="Location">
              <input
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
              />
            </Field>
          )}

          <Field label="Notes">
            <input
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
            />
          </Field>
        </div>

        <div className="aa-block">
          <h3 className="aa-h3">Actions</h3>

          <Field label="Admin note">
            <input
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
            />
          </Field>

          <Field label="Reschedule">
            <input
              type="datetime-local"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
            />
          </Field>

          <div className="aa-actions">
            <button className="aa-btn" onClick={approve}>
              Approve
            </button>
            <button className="aa-btn aa-btn--ghost" onClick={reschedule}>
              Reschedule
            </button>
            <button className="aa-btn aa-btn--ghost" onClick={cancel}>
              Cancel
            </button>
            <button className="aa-btn aa-btn--danger" onClick={reject}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
