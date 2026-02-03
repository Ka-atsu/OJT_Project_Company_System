import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { register as registerReq } from "./auth.service";

export default function Register() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="auth">
      <div className="auth-card auth-card--reverse">
        <div className="auth-left">
          <h2 className="auth-formTitle">Signup</h2>
          {err && <p className="auth-error">{err}</p>}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setErr("");

              if (pw !== pw2) return setErr("Passwords do not match.");

              try {
                setLoading(true);
                const user = await registerReq(name, email, pw, pw2);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
              } catch (e2) {
                setErr(
                  e2?.response?.data?.message ||
                    "Register failed. Check your inputs.",
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="auth-field">
              <span className="auth-label">Name</span>
              <input
                className="auth-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

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
              <span className="auth-label">Enter password</span>
              <div className="auth-pwWrap">
                <input
                  className="auth-input"
                  type={showPw ? "text" : "password"}
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
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
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
              />
            </label>

            <button
              className="auth-btn auth-btnSolid"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

        <div className="auth-right">
          <div className="auth-brand">
            <div className="auth-brandMark" aria-hidden="true" />
            <div className="auth-brandText">
              <strong>Cliberduche</strong> <span>Corporation</span>
            </div>
          </div>

          <h2 className="auth-welcomeTitle">Welcome Back!</h2>
          <p className="auth-welcomeSub">Already have an account?</p>

          <button
            className="auth-btn auth-btnOutline"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
