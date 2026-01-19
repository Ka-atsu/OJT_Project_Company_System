import { useState } from "react";
import "../css/auth.css";
import MouseLook3D from "../components/three/MouseLook3D";
import { useNavigate } from "react-router-dom";

export default function Login() {
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

      {/* Main card */}
      <div className="auth-card">
        {/* Left panel */}
        <div className="auth-left">
          <h2>Hello, Welcome!</h2>
          <p className="auth-muted">Don’t have an account?</p>

          <button
            className="auth-btn auth-btnOutline"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <div className="auth-why">
            <p className="auth-whyTitle">Why log in?</p>
            <ul>
              <li>Schedule on visit site</li>
              <li>I dunno what other benefits is there???</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-right">
          <MouseLook3D
            url={`${import.meta.env.BASE_URL}models/tower_crane.glb`}
          />

          {/* CC-BY attribution (required) */}
          <p className="auth-credit">
            This work is based on{" "}
            <a
              href="https://sketchfab.com/3d-models/tower-crane-49851dc7a51b43bda6aea06856c26a85"
              target="_blank"
              rel="noreferrer"
            >
              &quot;Tower Crane&quot;
            </a>{" "}
            by{" "}
            <a
              href="https://sketchfab.com/Chamodp"
              target="_blank"
              rel="noreferrer"
            >
              Chamod
            </a>{" "}
            licensed under{" "}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC-BY-4.0
            </a>
            .
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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

              <div className="auth-rowRight">
                <a className="auth-link" href="#">
                  forgot password?
                </a>
              </div>
            </label>

            <label className="auth-check">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button className="auth-btn auth-btnSolid" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
