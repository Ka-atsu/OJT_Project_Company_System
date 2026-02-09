import React, { useState } from "react";
import "./authdraft.css";
import logo from "../../assets/Images/logo.jpg";
import { login, register } from "./auth.service";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPwLogin, setShowPwLogin] = useState(false);
  const [showPwRegister, setShowPwRegister] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const toggleForm = () => {
    setErr("");
    setIsLogin((v) => !v);
  };

  function toErrorMessage(e, fallback = "Something went wrong") {
    // Laravel often returns { message } or { errors: {field:[...]} }
    const message = e?.response?.data?.message;
    if (message) return message;

    const errors = e?.response?.data?.errors;
    if (errors && typeof errors === "object") {
      const firstKey = Object.keys(errors)[0];
      if (firstKey && Array.isArray(errors[firstKey]) && errors[firstKey][0]) {
        return errors[firstKey][0];
      }
    }

    return e?.message ?? fallback;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) return setErr("Passwords do not match!");

    try {
      setLoading(true);
      const user = await register(name, email, password, confirm);
      localStorage.setItem("user", JSON.stringify(user));

      // optional: switch to login state after register
      setIsLogin(true);
    } catch (error) {
      setErr(toErrorMessage(error, "Register failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      setLoading(true);
      const user = await login(email, password, remember);
      localStorage.setItem("user", JSON.stringify(user));

      // optional: redirect (uncomment and change route)
      // window.location.href = "/dashboard";
    } catch (error) {
      setErr(toErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        {/* Forms Container */}
        <div className="forms-container">
          {/* REGISTER FORM - LEFT */}
          <div
            className={`form register-form ${!isLogin ? "visible" : "hidden"}`}
          >
            <h2 className="auth-formTitle">SIGN UP</h2>

            {err ? <div className="auth-error">{err}</div> : null}

            <form onSubmit={handleRegister}>
              <label className="auth-field">
                <span className="auth-label">Name</span>
                <input
                  name="name"
                  className="auth-input"
                  type="text"
                  required
                  disabled={loading}
                />
              </label>

              <label className="auth-field">
                <span className="auth-label">E-mail address</span>
                <input
                  name="email"
                  className="auth-input"
                  type="email"
                  required
                  disabled={loading}
                />
              </label>

              <label className="auth-field">
                <span className="auth-label">Enter password</span>
                <div className="auth-pwWrap">
                  <input
                    name="password"
                    className="auth-input"
                    type={showPwRegister ? "text" : "password"}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="auth-eyeBtn"
                    onClick={() => setShowPwRegister((v) => !v)}
                    aria-label={
                      showPwRegister ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                  >
                    👁
                  </button>
                </div>
              </label>

              <label className="auth-field">
                <span className="auth-label">Confirm password</span>
                <input
                  name="confirm"
                  className="auth-input"
                  type={showPwRegister ? "text" : "password"}
                  required
                  disabled={loading}
                />
              </label>

              <button
                className="auth-btn auth-btnSolid"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* LOGIN FORM - RIGHT */}
          <div className={`form login-form ${isLogin ? "visible" : "hidden"}`}>
            <h2 className="auth-formTitle">LOGIN</h2>

            {err ? <div className="auth-error">{err}</div> : null}

            <form onSubmit={handleLogin}>
              <label className="auth-field">
                <span className="auth-label">E-mail address</span>
                <input
                  name="email"
                  className="auth-input"
                  type="email"
                  required
                  disabled={loading}
                />
              </label>

              <label className="auth-field">
                <span className="auth-label">Password</span>
                <div className="auth-pwWrap">
                  <input
                    name="password"
                    className="auth-input"
                    type={showPwLogin ? "text" : "password"}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="auth-eyeBtn"
                    onClick={() => setShowPwLogin((v) => !v)}
                    aria-label={showPwLogin ? "Hide password" : "Show password"}
                    disabled={loading}
                  >
                    👁
                  </button>
                </div>
              </label>

              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>

              <button
                className="auth-btn auth-btnSolid"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="auth-credit">
                Your information is kept secure and confidential.
              </p>
            </form>
          </div>
        </div>

        {/* Blue Panels */}
        <div className="panels-container">
          <div className={`panel right-panel ${isLogin ? "moved-left" : ""}`}>
            <div className="panel-content">
              <div className="auth-brand">
                <div className="auth-brandMark">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="auth-brandText">
                  <strong>Cliberduche</strong> <span>Corporation</span>
                </div>
              </div>

              {isLogin ? (
                <div className="panel-text">
                  <h2>Welcome Back!</h2>
                  <p className="auth-welcomeSub">Don&apos;t have an account?</p>
                  <button
                    className="auth-btn auth-btnOutline"
                    onClick={toggleForm}
                    disabled={loading}
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="panel-text">
                  <h2>Hello, Welcome!</h2>
                  <p className="auth-muted">Already have an account?</p>
                  <button
                    className="auth-btn auth-btnOutline"
                    onClick={toggleForm}
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
