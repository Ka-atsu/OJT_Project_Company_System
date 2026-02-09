import { useState } from 'react';
import './authdraft.css';
import logo from '../../assets/Images/logo.jpg'; // Ensure this matches your file exactly

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPwLogin, setShowPwLogin] = useState(false);
  const [showPwRegister, setShowPwRegister] = useState(false);
  const [remember, setRemember] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) return alert("Passwords do not match!");
    console.log("Register Data:", { name, email, password });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Login Data:", { email, password, remember });
  };

  return (
    <div className="auth">
      <div className="auth-card">

        {/* Forms Container */}
        <div className="forms-container">

          {/* REGISTER FORM - LEFT */}
          <div className={`form register-form ${!isLogin ? 'visible' : 'hidden'}`}>
            <h2 className="auth-formTitle">SIGN UP</h2>
            <form onSubmit={handleRegister}>
              <label className="auth-field">
                <span className="auth-label">Name</span>
                <input name="name" className="auth-input" type="text" required />
              </label>

              <label className="auth-field">
                <span className="auth-label">E-mail address</span>
                <input name="email" className="auth-input" type="email" required />
              </label>

              <label className="auth-field">
                <span className="auth-label">Enter password</span>
                <div className="auth-pwWrap">
                  <input
                    name="password"
                    className="auth-input"
                    type={showPwRegister ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="auth-eyeBtn"
                    onClick={() => setShowPwRegister(v => !v)}
                    aria-label={showPwRegister ? "Hide password" : "Show password"}
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
                />
              </label>

              <button className="auth-btn auth-btnSolid" type="submit">
                Create Account
              </button>
            </form>
          </div>

          {/* LOGIN FORM - RIGHT */}
          <div className={`form login-form ${isLogin ? 'visible' : 'hidden'}`}>
            <h2 className="auth-formTitle">LOGIN</h2>
            <form onSubmit={handleLogin}>
              <label className="auth-field">
                <span className="auth-label">E-mail address</span>
                <input name="email" className="auth-input" type="email" required />
              </label>

              <label className="auth-field">
                <span className="auth-label">Password</span>
                <div className="auth-pwWrap">
                  <input
                    name="password"
                    className="auth-input"
                    type={showPwLogin ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="auth-eyeBtn"
                    onClick={() => setShowPwLogin(v => !v)}
                    aria-label={showPwLogin ? "Hide password" : "Show password"}
                  >
                    👁
                  </button>
                </div>
              </label>

              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button className="auth-btn auth-btnSolid" type="submit">
                Sign In
              </button>

              <p className="auth-credit">
                Your information is kept secure and confidential.
              </p>
            </form>
          </div>

        </div>

        {/* Blue Panels */}
        <div className="panels-container">

          {/* Right Panel */}
          <div className={`panel right-panel ${isLogin ? 'moved-left' : ''}`}>
            <div className="panel-content">
              <div className="auth-brand">
                <div className="auth-brandMark">
                  <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="auth-brandText">
                  <strong>Cliberduche</strong> <span>Corporation</span>
                </div>
              </div>

              {isLogin ? (
                <>
                  <div className="panel-text">
                    <h2>Welcome Back!</h2>
                    <p className="auth-welcomeSub">Already have an account?</p>
                    <button className="auth-btn auth-btnOutline" onClick={toggleForm}>
                      Register
                    </button>
                  </div>
                </>
              ) : (
                <>
                <div className="panel-text">
                  <h2>Hello, Welcome!</h2>
                  <p className="auth-muted">Don't have an account?</p>
                  <button className="auth-btn auth-btnOutline" onClick={toggleForm}>
                    Login
                  </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Auth;
