import { createPortal } from "react-dom";

export default function EmailVerificationModal({
  open,
  otp,
  setOtp,
  onClose,
  onVerify,
}) {
  if (!open) return null;

  return createPortal(
    <div className="modal-overlay">
      {" "}
      <div className="verify-modal">
        {" "}
        <h3>Email Verification</h3>{" "}
        <p>Enter the verification code sent to your email.</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter verification code"
          className="otp-input"
        />
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary" onClick={onVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
