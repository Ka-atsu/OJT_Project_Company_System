import { useState } from "react";
import "../css/auth.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="auth">
      {/* Top logo pill */}
      <div className="auth-brand">
        <div className="auth-brandMark" aria-hidden="true" />
        <div className="auth-brandText">
          <strong>Cliberduche</strong> <span>Corporation</span>
        </div>
      </div>

      {/* Main card (reversed layout) */}
      <div className="auth-card auth-card--reverse">
        {/* Left = form (light) */}
        <div className="auth-left">
          <h2 className="auth-formTitle">Signup</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle register
            }}
          >
            <label className="auth-field">
              <span className="auth-label">Name</span>
              <input className="auth-input" type="text" required />
            </label>

            <label className="auth-field">
              <span className="auth-label">E-mail address</span>
              <input className="auth-input" type="email" required />
            </label>

            <label className="auth-field">
              <span className="auth-label">Enter password</span>
              <div className="auth-pwWrap">
                <input
                  className="auth-input"
                  type={showPw ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="auth-eyeBtn"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5c5.5 0 9.5 4.7 10.8 6.6.3.5.3 1.2 0 1.8C21.5 15.3 17.5 20 12 20S2.5 15.3 1.2 13.4c-.3-.6-.3-1.3 0-1.8C2.5 9.7 6.5 5 12 5Zm0 2C7.8 7 4.4 10.6 3.2 12c1.2 1.4 4.6 5 8.8 5s7.6-3.6 8.8-5C19.6 10.6 16.2 7 12 7Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </label>

            <label className="auth-field">
              <span className="auth-label">Confirm password</span>
              <input
                className="auth-input"
                type={showPw ? "text" : "password"}
                required
              />
            </label>

            <label className="auth-check">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button className="auth-btn auth-btnSolid" type="submit">
              Create account
            </button>
          </form>
        </div>

        {/* Right = dark panel */}
        <div className="auth-right">
          <h2 className="auth-welcomeTitle">Welcome Back!</h2>
          <p className="auth-welcomeSub">Already have an account?</p>

          <button
            className="auth-btn auth-btnOutline"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <div className="auth-why">
            <p className="auth-whyTitle">Why log in?</p>
            <ul>
              <li>Schedule on visit site</li>
              <li>I dunno what other benefits is there???</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
