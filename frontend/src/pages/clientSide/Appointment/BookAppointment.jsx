import "./book.appointment.css";

export default function BookAppointment({ onClose }) {
  return (
    <section className="appointment-overlay" role="dialog" aria-modal="true">
      {/* click outside to close */}
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

        <form className="appointment-form-grid">
          {/* LEFT */}
          <div className="form-col">
            <label className="form-field">
              <span>Name</span>
              <input type="text" placeholder="Enter your name" />
            </label>

            <label className="form-field">
              <span>Email</span>
              <input type="email" placeholder="Enter your email" />
            </label>

            <label className="form-field">
              <span>Phone Number</span>
              <input type="tel" placeholder="Enter phone number" />
            </label>

            <label className="form-field">
              <span>Date</span>
              <input type="date" />
            </label>
          </div>

          {/* RIGHT */}
          <div className="form-col">
            <label className="form-field">
              <span>Project Type</span>
              <select>
                <option>Project Type</option>
                <option>Commercial</option>
                <option>Residential</option>
                <option>Consultation</option>
              </select>
            </label>

            <label className="form-field">
              <span>Additional Details</span>
              <textarea rows="6" placeholder="Describe your request" />
            </label>
          </div>
        </form>

        <div className="appointment-float-footer">
          <p className="dash-item-meta">
            We typically respond within 24–48 hours.
          </p>

          <button className="dash-btn primary" type="button" onClick={onClose}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
