import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { YEARS, MONTHS } from "../../../utils/dateConstants";

export default function BookAppointment({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    phone: "",
    dateTime: null,
    project: "",
    purpose: "Consultation",
    details: "",
    mode: "online",
  });

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.dateTime || !form.project) return;

    const payload = {
      phone: form.phone || null,
      scheduled_at: form.dateTime.toISOString(),
      project: form.project,
      purpose: form.purpose,
      details: form.details || null,
      mode: form.mode,
    };

    await onSubmit?.(payload);
    onClose();
  };

  return (
    <section className="appointment-overlay" role="dialog" aria-modal="true">
      <button
        className="appointment-overlay-bg"
        type="button"
        onClick={onClose}
        aria-label="Close overlay"
      />

      <div className="appointment-float dash-surface">
        <div className="appointment-float-top">
          <h2 className="appointment-float-title">Book an Appointment</h2>

          <button
            className="appointment-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          className="appointment-form-grid"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-col">
            <label className="form-field">
              <span>Phone Number</span>
              <input
                value={form.phone}
                onChange={update("phone")}
                type="tel"
                placeholder="Enter phone number"
              />
            </label>

            <label className="form-field">
              <span>Date & Time</span>

              <DatePicker
                selected={form.dateTime}
                onChange={(d) => setForm((p) => ({ ...p, dateTime: d }))}
                showTimeSelect
                timeIntervals={15}
                minDate={new Date()}
                dateFormat="MMM dd, yyyy h:mm aa"
                placeholderText="Select date and time"
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
                      {YEARS(new Date().getFullYear(), 10).map((y) => (
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
            </label>

            <div className="form-field">
              <span>Meeting Type</span>

              <div className="meeting-type">
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="mode"
                    value="online"
                    checked={form.mode === "online"}
                    onChange={update("mode")}
                  />
                  Online
                </label>

                <label className="radio-pill">
                  <input
                    type="radio"
                    name="mode"
                    value="f2f"
                    checked={form.mode === "f2f"}
                    onChange={update("mode")}
                  />
                  Face-to-face
                </label>
              </div>

              <small className="dash-item-meta meeting-hint">
                If accepted, admin will send the meeting link or location.
              </small>
            </div>
          </div>

          <div className="form-col">
            <label className="form-field">
              <span>Project</span>
              <input
                value={form.project}
                onChange={update("project")}
                type="text"
                placeholder="Enter project name"
              />
            </label>

            <label className="form-field">
              <span>Purpose</span>

              <Select
                classNamePrefix="appt-select"
                value={{ value: form.purpose, label: form.purpose }}
                onChange={(opt) =>
                  setForm((p) => ({ ...p, purpose: opt.value }))
                }
                options={[
                  { value: "Consultation", label: "Consultation" },
                  { value: "Contract", label: "Contract" },
                  { value: "Documents", label: "Documents" },
                  { value: "Planning", label: "Planning" },
                ]}
                isSearchable={false}
              />
            </label>

            <label className="form-field">
              <span>Additional Details</span>
              <textarea
                value={form.details}
                onChange={update("details")}
                rows="6"
                placeholder="Describe your request"
              />
            </label>
          </div>
        </form>

        <div className="appointment-float-footer">
          <p className="dash-item-meta">
            We typically respond within 24–48 hours.
          </p>

          <button
            className="dash-btn primary"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
