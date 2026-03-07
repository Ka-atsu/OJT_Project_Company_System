import React, { useState } from "react";
import "./authdraft.css";
import logo from "../../assets/Images/logo.jpg";
import { login, register, verifyTwoFactor } from "./auth.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MouseLook3D from "../../components/three/MouseLook3D";
import { flushSync } from "react-dom";
import { RECAPTCHA_SITE_KEY } from "../../api/publicApiKey";
import ReCAPTCHA from "react-google-recaptcha";


const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPwLogin, setShowPwLogin] = useState(false);
  const [showPwRegister, setShowPwRegister] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [needs2FA, setNeeds2FA] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const [captcha, setCaptcha] = useState(null);
  
  console.log("Auth render", { needs2FA, loading }, performance.now());

  const Back_to_Home = ({ className }) => {
    return (
      <button
        className={className}
        onClick={() => navigate("/")}
        disabled={loading}
      >
        Return to Website
      </button>
    );
  };

  const toggleForm = () => {
    setErr("");
    setNeeds2FA(false);
    setOtpCode("");
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

  if (!captcha) {
    return setErr("Please complete the captcha verification.");
  }

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const confirm = e.target.confirm.value;

  if (password !== confirm) return setErr("Passwords do not match!");

  try {
    setLoading(true);

    const user = await register(name, email, password, confirm);

    localStorage.setItem("user", JSON.stringify(user));

    setCaptcha(null);

    navigate("/dashboard");

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

    console.time("login request");
    try {
      setLoading(true);
      const result = await login(email, password, remember);
      console.timeEnd("login request");
      console.log("got login result", result, performance.now());

      if (result?.requires2FA) {
        console.log("before setNeeds2FA", performance.now());
        setNeeds2FA(true);
        setErr("");
        setLoading(false);
        console.log("after setNeeds2FA", performance.now());
        return;
      }

      localStorage.setItem("user", JSON.stringify(result));
      navigate(result.redirectTo, { replace: true });
    } catch (error) {
      console.timeEnd("login request");
      setErr(toErrorMessage(error, "Login failed"));
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      const user = await verifyTwoFactor(otpCode.trim());

      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.redirectTo, { replace: true });
    } catch (error) {
      setErr(toErrorMessage(error, "2FA verification failed"));
    } finally {
      setLoading(false);
    }
  };

  const backToLogin = () => {
    setNeeds2FA(false);
    setOtpCode("");
    setErr("");
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
              
              <div className="auth-captcha">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptcha(token)}
                />
              </div>

              <button
                className="auth-btnSolid"
                type="submit"
                disabled={loading || !captcha}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* LOGIN / 2FA FORM */}
          <div className={`form login-form ${isLogin ? "visible" : "hidden"}`}>
            <h2 className="auth-formTitle">
              {needs2FA ? "TWO-FACTOR AUTH" : "SIGN IN"}
            </h2>
            {err && <div className="auth-error">{err}</div>}

            {!needs2FA ? (
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
                      aria-label={
                        showPwLogin ? "Hide password" : "Show password"
                      }
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
            ) : (
              <form onSubmit={handleVerify2FA}>
                <label className="auth-field">
                  <span className="auth-label">Verification Code</span>
                  <input
                    name="otp"
                    className="auth-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                    disabled={loading}
                  />
                </label>

                <button
                  className="auth-btnSolid"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  type="button"
                  className="auth-btn auth-btnOutline"
                  onClick={backToLogin}
                  disabled={loading}
                >
                  Back
                </button>

                <p className="auth-credit">
                  Enter the code sent to your email to finish signing in.
                </p>
              </form>
            )}
          </div>
        </div>

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

              {!needs2FA && (
                <MouseLook3D
                  url={`${import.meta.env.BASE_URL}models/Backhoe.glb`}
                />
              )}

              {isLogin ? (
                <div className="panel-text">
                  <h2>{needs2FA ? "Almost There" : "Welcome Back!"}</h2>
                  <p className="auth-welcomeSub">
                    {needs2FA
                      ? "Complete verification to continue."
                      : "Don't have an account?"}
                  </p>

                  {!needs2FA && (
                    <button
                      className="auth-btn auth-btnLogin"
                      onClick={toggleForm}
                      disabled={loading}
                    >
                      Register
                    </button>
                  )}

                  <Back_to_Home className="auth-btn auth-btnOutline" />

                  {!needs2FA && (
                    <div className="auth-why">
                      <p className="auth-whyTitle">Why log in?</p>
                      <ul>
                        <li>Request project quotations</li>
                        <li>Schedule site inspections</li>
                        <li>Track project inquiries</li>
                        <li>Manage account details securely</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="panel-text">
                  <h2>Hello, Welcome!</h2>
                  <p className="auth-muted">Already have an account?</p>
                  <button
                    className="auth-btn auth-btnLogin"
                    onClick={toggleForm}
                    disabled={loading}
                  >
                    Login
                  </button>
                  <Back_to_Home className="auth-btn auth-btnOutline" />
                  <div className="auth-why">
                    <p className="auth-whyTitle">Why register?</p>
                    <ul>
                      <li>Submit new project requests</li>
                      <li>Monitor service updates</li>
                      <li>Communicate with administrators</li>
                      <li>Secure access to your dashboard</li>
                    </ul>
                  </div>
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
