import { useState } from "react";
import "./auth.css";
import MouseLook3D from "../../components/three/MouseLook3D";
import { useNavigate } from "react-router-dom";
import { login as loginReq } from "./auth.service";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-brandMark" aria-hidden="true" />
            <div className="auth-brandText">
              <strong>Cliberduche</strong> <span>Corporation</span>
            </div>
          </div>

          <h2>Welcome back</h2>
          <p className="auth-muted">
            Access your account to manage requests and projects.
          </p>

          <p className="auth-muted">Don’t have an account?</p>

          <button
            className="auth-btn auth-btnOutline"
            type="button"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>

          <div className="auth-why">
            <p className="auth-whyTitle">Why log in?</p>
            <ul>
              <li>Request project quotations</li>
              <li>Schedule site inspections</li>
              <li>Track project inquiries</li>
              <li>Manage account details securely</li>
            </ul>
          </div>
        </div>

        <div className="auth-right">
          <MouseLook3D url={`${import.meta.env.BASE_URL}models/Backhoe.glb`} />

          <h2 className="auth-formTitle">SignIn</h2>
          {err && <p className="auth-error">{err}</p>}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setErr("");

              try {
                setLoading(true);
                const user = await loginReq(email, password, remember);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
              } catch (e2) {
                setErr(
                  e2?.response?.data?.message ||
                    "Login failed. Check your credentials.",
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="auth-field">
              <span className="auth-label">E-mail address</span>
              <input
                className="auth-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Password</span>

              <div className="auth-pwWrap">
                <input
                  className="auth-input"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <label className="auth-check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button
              className="auth-btn auth-btnSolid"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="auth-credit">
              Your information is kept secure and confidential.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
