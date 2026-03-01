import DatePicker from "react-datepicker";

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

import { MONTHS, YEARS } from "../../../utils/dateConstants";

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
  reschedule,
  successMessage,
  loading,
}) {
  if (loading) {
    return (
      <section className="aa-card">
        <div className="aa-card__header">
          <div className="aa-skel aa-skel-title" style={{ width: 120 }} />
          <div className="aa-skel aa-skel-small" style={{ width: 80 }} />
        </div>

        <div className="aa-details">
          <div className="aa-block">
            <div className="aa-skel aa-skel-title" />
            <div className="aa-skel aa-skel-small" />
          </div>

          <div className="aa-block">
            <div className="aa-skel aa-skel-line" />
            <div className="aa-skel aa-skel-line" />
            <div className="aa-skel aa-skel-line" />
          </div>

          <div className="aa-block">
            <div className="aa-actions">
              <div className="aa-skel aa-skel-btn" />
              <div className="aa-skel aa-skel-btn" />
              <div className="aa-skel aa-skel-btn" />
            </div>
          </div>
        </div>
      </section>
    );
  }
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
                className="dash-input"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            </Field>
          ) : (
            <Field label="Location">
              <input
                className="dash-input"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
              />
            </Field>
          )}

          <Field label="Notes">
            <input
              className="dash-input"
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
            />
          </Field>
        </div>

        <div className="aa-block">
          <h3 className="aa-h3">Actions</h3>

          <Field label="Admin note">
            <input
              className="dash-input"
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
            />
          </Field>

          <Field label="Reschedule date & time">
            <DatePicker
              selected={newDateTime ? new Date(newDateTime) : null}
              onChange={(date) =>
                setNewDateTime(date ? date.toISOString().slice(0, 16) : "")
              }
              showTimeSelect
              timeIntervals={30}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd HH:mm"
              className="dash-input"
              calendarClassName="appt-dp"
              popperClassName="appt-dp-popper"
              showPopperArrow={false}
              timeCaption="Time"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
              }) => (
                <div className="appt-dp-header">
                  <button type="button" onClick={decreaseMonth}>
                    ‹
                  </button>

                  <select
                    value={date.getFullYear()}
                    onChange={(e) => changeYear(Number(e.target.value))}
                  >
                    {YEARS(new Date().getFullYear() - 5, 10).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>

                  <select
                    value={date.getMonth()}
                    onChange={(e) => changeMonth(Number(e.target.value))}
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <button type="button" onClick={increaseMonth}>
                    ›
                  </button>
                </div>
              )}
            />
          </Field>

          <p className="aa-note">
            Any changes made above will be saved when you click Approve, Reject,
            or Reschedule.
          </p>

          {successMessage && <div className="aa-success">{successMessage}</div>}

          <div className="aa-actions">
            <button
              className="aa-btn"
              onClick={approve}
              disabled={
                selected.mode === "online"
                  ? !meetingLink.trim()
                  : !meetingLocation.trim()
              }
            >
              Approve
            </button>
            <button
              className="aa-btn aa-btn--ghost"
              onClick={reschedule}
              disabled={!newDateTime}
            >
              Reschedule
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
