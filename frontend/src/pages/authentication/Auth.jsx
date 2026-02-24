import React, { useState } from "react";
import "./authdraft.css";
import logo from "../../assets/Images/logo.jpg";
import { login, register } from "./auth.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPwLogin, setShowPwLogin] = useState(false);
  const [showPwRegister, setShowPwRegister] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const Back_to_Home = (props) => {
    return (
      <button
        className={`btn-back-to-home-pos-${props.className}`}
        onClick={() => navigate("/")}
        disabled={loading}
      >
        Landing Page
      
      </button>
    );
  }

  const toggleForm = () => {
    setErr("");
    setIsLogin((v) => !v);
  };

  function toErrorMessage(e, fallback = "Something went wrong") {
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

      // optional: save user
      localStorage.setItem("user", JSON.stringify(user));

      // OPTIONAL: redirect right after register
      // navigate(user.redirectTo, { replace: true });

      // or keep your old behavior: go back to login form
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

      // save user
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect depending on admin
      navigate(user.redirectTo, { replace: true });
      // or: navigate(user.isAdmin ? "/admin" : "/dashboard", { replace: true });
    } catch (error) {
      setErr(toErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="forms-container">
          {/* REGISTER FORM */}
          <div
            className={`form register-form ${!isLogin ? "visible" : "hidden"}`}
          >
            <h2 className="auth-formTitle">SIGN UP</h2>
            {err && <div className="auth-error">{err}</div>}

            <form onSubmit={handleRegister}>
              <label className="auth-field">
                <span className="auth-label">Full Name</span>
                <input
                  name="name"
                  className="auth-input"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </label>

              <label className="auth-field">
                <span className="auth-label">Email Address</span>
                <input
                  name="email"
                  className="auth-input"
                  type="email"
                  placeholder="email@example.com"
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
                    type={showPwRegister ? "text" : "password"}
                    placeholder="Enter your password"
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
                    {showPwRegister ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </label>

              <label className="auth-field">
                <span className="auth-label">Confirm Password</span>
                <input
                  name="confirm"
                  className="auth-input"
                  type={showPwRegister ? "text" : "password"}
                  placeholder="Re-enter your password"
                  required
                  disabled={loading}
                />
              </label>

              <button
                className="auth-btnSolid"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* LOGIN FORM */}
          <div className={`form login-form ${isLogin ? "visible" : "hidden"}`}>
            <h2 className="auth-formTitle">SIGN IN</h2>
            {err && <div className="auth-error">{err}</div>}

            <form onSubmit={handleLogin}>
              <label className="auth-field">
                <span className="auth-label">Email Address</span>
                <input
                  name="email"
                  className="auth-input"
                  type="email"
                  placeholder="email@example.com"
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
                    placeholder="Enter your password"
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
                    {showPwLogin ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
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
                className="auth-btnSolid"
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
                  <img src={logo} alt="Logo" className="auth-logo" />
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
                  <Back_to_Home className="auth-btn auth-btnOutline"/>
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
                  <Back_to_Home className = "auth-btn auth-btnOutline"/>

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
