import React, { useState } from "react";
import "./SocialHubMain.css";

/**
 * PUBLIC_INTERFACE
 * AuthModal
 * Multi-purpose authentication modal for login, registration, and mobile login.
 * Handles UI states, switching, and input validation.
 */
function AuthModal({ mode, onClose }) {
  // 'login', 'signup', or 'mobile'
  const [tab, setTab] = useState(mode || "login");
  // Form state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    password2: "",
    displayName: "",
    mobile: "",
    otp: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false); // For simulating network state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Input change helper
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  // Mark field as touched for validation
  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  // Email syntax check
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Mobile: allows leading +, 10-15 digits
  function isValidMobile(mobile) {
    return /^(\+?\d{10,15})$/.test(mobile);
  }

  // UI field error helpers
  function getEmailError() {
    if (!inputs.email?.trim()) return "Email required";
    if (!isValidEmail(inputs.email)) return "Invalid email";
    return "";
  }
  function getPasswordError() {
    if (!inputs.password) return "Password required";
    if (inputs.password.length < 6)
      return "At least 6 characters";
    return "";
  }
  function getDisplayNameError() {
    if (!inputs.displayName.trim()) return "Display name required";
    if (inputs.displayName.length < 2)
      return "Too short";
    return "";
  }
  function getMobileError() {
    if (!inputs.mobile?.trim()) return "Mobile required";
    if (!isValidMobile(inputs.mobile)) return "Invalid mobile number";
    return "";
  }

  function getPassword2Error() {
    if (!inputs.password2) return "Confirm password";
    if (inputs.password !== inputs.password2)
      return "Passwords do not match";
    return "";
  }
  // Simulated submit handlers (replace with actual backend calls)
  function handleLogin(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError("");
    setSuccess("");

    if (getEmailError() || getPasswordError()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Login successful! (Demo)");
      setTimeout(onClose, 950);
    }, 700);
  }
  function handleSignup(e) {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      password2: true,
      displayName: true,
    });
    setError("");
    setSuccess("");
    if (
      getEmailError() ||
      getPasswordError() ||
      getPassword2Error() ||
      getDisplayNameError()
    )
      return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Registration successful! (Demo)");
      setTimeout(onClose, 1300);
    }, 800);
  }
  function handleSendOtp(e) {
    e.preventDefault();
    setTouched({ mobile: true });
    setError("");
    setSuccess("");
    if (getMobileError()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setSuccess("OTP sent to mobile number!");
    }, 750);
  }
  function handleOtpLogin(e) {
    e.preventDefault();
    if (!inputs.otp?.trim() || inputs.otp.length < 4) {
      setError("Enter valid OTP");
      setTouched((t) => ({ ...t, otp: true }));
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    setTimeout(() => {
      setLoading(false);
      setSuccess("Mobile login successful! (Demo)");
      setTimeout(onClose, 1200);
    }, 700);
  }

  // Tab/button switchers
  function handleTabSwitch(newTab) {
    setTab(newTab);
    setInputs({
      email: "",
      password: "",
      password2: "",
      displayName: "",
      mobile: "",
      otp: "",
    });
    setTouched({});
    setOtpSent(false);
    setError("");
    setSuccess("");
    setLoading(false);
  }

  // UI for current tab
  function renderLoginForm() {
    return (
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          disabled={loading}
          aria-label="Email"
        />
        {touched.email && getEmailError() && (
          <div className="input-error">{getEmailError()}</div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="current-password"
          disabled={loading}
          aria-label="Password"
        />
        {touched.password && getPasswordError() && (
          <div className="input-error">{getPasswordError()}</div>
        )}
        <button
          className="btn primary"
          type="submit"
          disabled={loading || !!getEmailError() || !!getPasswordError()}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* Option to switch */}
        <div className="auth-switch" style={{ marginTop: 10 }}>
          New here?{" "}
          <button type="button" onClick={() => handleTabSwitch("signup")}>
            Sign Up
          </button>
          <span>{" | "}</span>
          <button type="button" onClick={() => handleTabSwitch("mobile")}>
            Mobile Login
          </button>
        </div>
      </form>
    );
  }
  function renderSignupForm() {
    return (
      <form onSubmit={handleSignup} autoComplete="off">
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={inputs.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          aria-label="Display Name"
        />
        {touched.displayName && getDisplayNameError() && (
          <div className="input-error">{getDisplayNameError()}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          aria-label="Email"
        />
        {touched.email && getEmailError() && (
          <div className="input-error">{getEmailError()}</div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          autoComplete="new-password"
          aria-label="Password"
        />
        {touched.password && getPasswordError() && (
          <div className="input-error">{getPasswordError()}</div>
        )}
        <input
          type="password"
          name="password2"
          placeholder="Repeat Password"
          value={inputs.password2}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          autoComplete="new-password"
          aria-label="Repeat Password"
        />
        {touched.password2 && getPassword2Error() && (
          <div className="input-error">{getPassword2Error()}</div>
        )}
        <button
          className="btn primary"
          type="submit"
          disabled={
            loading ||
            !!getEmailError() ||
            !!getPasswordError() ||
            !!getDisplayNameError() ||
            !!getPassword2Error()
          }
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="auth-switch" style={{ marginTop: 10 }}>
          Already have an account?{" "}
          <button type="button" onClick={() => handleTabSwitch("login")}>
            Login
          </button>
          <span>{" | "}</span>
          <button type="button" onClick={() => handleTabSwitch("mobile")}>
            Mobile Login
          </button>
        </div>
      </form>
    );
  }
  function renderMobileForm() {
    return !otpSent ? (
      <form onSubmit={handleSendOtp} autoComplete="off">
        <input
          type="text"
          name="mobile"
          placeholder="Mobile number"
          value={inputs.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          aria-label="Mobile Number"
        />
        {touched.mobile && getMobileError() && (
          <div className="input-error">{getMobileError()}</div>
        )}
        <button
          className="btn primary"
          type="submit"
          disabled={loading || !!getMobileError()}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
        <div className="auth-switch" style={{ marginTop: 10 }}>
          <button type="button" onClick={() => handleTabSwitch("login")}>
            Login with Email
          </button>
          <span>{" | "}</span>
          <button type="button" onClick={() => handleTabSwitch("signup")}>
            Register
          </button>
        </div>
      </form>
    ) : (
      <form onSubmit={handleOtpLogin} autoComplete="off">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={inputs.otp}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          aria-label="OTP"
        />
        {(touched.otp || error) && !inputs.otp && (
          <div className="input-error">Enter OTP</div>
        )}
        <button
          className="btn primary"
          type="submit"
          disabled={loading || !inputs.otp.trim()}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="auth-switch" style={{ marginTop: 10 }}>
          Wrong number?{" "}
          <button type="button" onClick={() => handleTabSwitch("mobile")}>
            Change
          </button>
        </div>
      </form>
    );
  }

  // Tab headings
  const tabTitles = {
    login: "Login",
    signup: "Sign Up",
    mobile: "Mobile Login",
  };
  // Tab navigation
  function renderTabs() {
    return (
      <div style={{ display: "flex", gap: 7, marginBottom: 22 }}>
        {["login", "signup", "mobile"].map((key) => (
          <button
            key={key}
            className={`btn${tab === key ? " primary" : " secondary"}`}
            type="button"
            style={{
              borderRadius: 7,
              fontWeight: tab === key ? 600 : undefined,
              opacity: tab === key ? 1 : 0.7,
            }}
            onClick={() => handleTabSwitch(key)}
            tabIndex={tab === key ? -1 : 0}
          >
            {tabTitles[key]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="auth-modal">
      <div className="auth-card">
        <button className="auth-close-btn" onClick={onClose}>
          &times;
        </button>
        {renderTabs()}
        <h2 style={{ margin: "5px 0 6px", fontWeight: 700 }}>{tabTitles[tab]}</h2>

        {error && <div className="input-error" style={{ textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "#1ad77b", textAlign: "center", marginBottom: 10 }}>{success}</div>}
        <div>
          {tab === "login"
            ? renderLoginForm()
            : tab === "signup"
            ? renderSignupForm()
            : renderMobileForm()}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
