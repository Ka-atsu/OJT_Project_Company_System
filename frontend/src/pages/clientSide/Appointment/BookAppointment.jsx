import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { YEARS, MONTHS } from "../../../utils/dateConstants";

export default function BookAppointment({ onClose, onSubmit }) {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    dateTime: null,
    project: "",
    purpose: "Consultation",
    details: "",
    mode: "online",
  });

  const update = (key) => (e) => {
    let value = e.target.value;

    if (key === "phone") {
      // Remove everything except numbers and '+'
      value = value.replace(/[^\d+]/g, "");

      // Limit length depending on prefix
      if (value.startsWith("09")) {
        value = value.slice(0, 11); // 09XXXXXXXXX
      } else if (value.startsWith("+63")) {
        value = value.slice(0, 13); // +63XXXXXXXXX
      } else if (
        value.length > 0 &&
        !value.startsWith("+") &&
        !value.startsWith("0")
      ) {
        // Allow starting '0' or '+' only, else reset
        value = "";
      }
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isPhoneValid = () => {
    if (!form.phone) return false;

    // Must match exactly:
    // 09XXXXXXXXX  (11 digits)
    // OR
    // +63XXXXXXXXX (13 characters total)

    const localRegex = /^09\d{9}$/;
    const intlRegex = /^\+63\d{10}$/;

    return localRegex.test(form.phone) || intlRegex.test(form.phone);
  };

  const isDetailsValid = () => {
    if (!form.details.trim()) return true; // optional

    const wordCount = form.details.trim().split(/\s+/).length;

    return wordCount <= 100;
  };

  const isFormValid =
    form.dateTime &&
    form.project.trim().length > 0 &&
    isPhoneValid() &&
    isDetailsValid();

  const handleSubmit = async () => {
    if (!isFormValid) return;

    function FormatDate(date) {
      return new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
        ),
      ).toISOString();
    }

    const payload = {
      phone: form.phone,
      scheduled_at: FormatDate(form.dateTime),
      project: form.project,
      purpose: form.purpose,
      details: form.details || null,
      mode: form.mode,
    };

    await onSubmit?.(payload);

    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <section className="appointment-overlay" role="dialog" aria-modal="true">
      <div className="appointment-float dash-surface">
        {success ? (
          <div className="appointment-success">
            <h2>Appointment Submitted 🎉</h2>
            <p>
              Your request has been sent successfully. We will respond within
              24–48 hours.
            </p>
          </div>
        ) : (
          <>
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
                    inputMode="tel"
                    placeholder="Enter phone number (09XXXXXXXXX or +63XXXXXXXXX)"
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
                    className={!isDetailsValid() ? "invalid" : ""}
                  />
                  <small
                    className={`word-count ${!isDetailsValid() ? "error" : ""}`}
                  >
                    {form.details.trim()
                      ? form.details.trim().split(/\s+/).length
                      : 0}{" "}
                    / 100 words
                  </small>
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
                disabled={!isFormValid}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
