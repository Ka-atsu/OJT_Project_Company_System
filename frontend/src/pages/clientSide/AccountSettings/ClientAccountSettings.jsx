import { useState, useEffect } from "react";
import AccountNav from "../../../components/navigation/AccountNav";
import { SettingRow, Divider, Toggle } from "./AccountSettingsComponent";
import "./clientAccountSettings.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./confirmModal";
import { logout } from "../../authentication/auth.service";
import EmailVerificationModal from "./EmailVerificationModal";

/* API services */
import {
  getUser,
  updateProfile,
  updateEmail,
  changePassword,
  toggleTwoFactor,
  toggleNotifications,
  deleteAccount,
  sendEmailVerification,
  verifyEmailOtp,
} from "./account.service";

export default function ClientAccountSettings() {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  /* =========================
     Fetch user from backend
  ========================= */
  const loadUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user)
    return (
      <div className="account-settings">
        <div className="skeleton skeleton-title" />

        <div className="account-tabs">
          <div className="skeleton skeleton-tab" />
          <div className="skeleton skeleton-tab" />
          <div className="skeleton skeleton-tab" />
        </div>

        <div className="account-card">
          <div className="skeleton skeleton-row" />
          <div className="divider" />
          <div className="skeleton skeleton-row" />
          <div className="divider" />
          <div className="skeleton skeleton-row" />
        </div>
      </div>
    );

  /* =========================
     Update name
  ========================= */
  const handleUpdateName = async () => {
    const name = prompt("Enter new name", user.name);

    if (!name) return;

    try {
      await updateProfile({ name });
      await loadUser();
      alert("Name updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update name.");
    }
  };

  /* =========================
     Update email
  ========================= */
  const handleUpdateEmail = async () => {
    const email = prompt("Enter new email", user.email);

    if (!email) return;

    try {
      await updateEmail(email);
      await loadUser();
      alert("Email updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update email.");
    }
  };

  /* =========================
     Change password
  ========================= */
  const handleChangePassword = async () => {
    const current_password = prompt("Enter current password");
    const password = prompt("Enter new password");

    if (!current_password || !password) return;

    try {
      await changePassword({
        current_password,
        password,
        password_confirmation: password,
      });

      alert("Password updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update password.");
    }
  };

  /* =========================
     Toggle 2FA
  ========================= */
  const handleToggle2FA = async (enabled) => {
    if (!user.email_verified_at) {
      alert("Please verify your email before enabling 2-step verification.");
      return;
    }

    try {
      await toggleTwoFactor(enabled);
      await loadUser();
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     Toggle notifications
  ========================= */
  const handleToggleNotifications = async (enabled) => {
    if (!user.email_verified_at) {
      alert("Please verify your email before enabling notifications.");
      return;
    }

    try {
      await toggleNotifications(enabled);
      await loadUser();
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     Delete account
  ========================= */
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await deleteAccount();
      alert("Account deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

  /* =========================
     Send Verification Code
  ========================= */
  const handleSendVerification = async () => {
    try {
      await sendEmailVerification();
      setShowVerifyModal(true);
      alert("Verification code sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send verification email.");
    }
  };

  /* =========================
     Send Verify Otp
  ========================= */
  const handleVerifyOtp = async () => {
    try {
      await verifyEmailOtp(otp);
      alert("Email verified successfully!");
      setShowVerifyModal(false);
      setOtp("");
      await loadUser();
    } catch (err) {
      console.error(err);
      alert("Invalid verification code.");
    }
  };

  return (
    <div className="account-settings">
      <h2 className="account-title">Account Settings</h2>

      <AccountNav active={activeTab} onChange={setActiveTab} />

      {/* =========================
         SECURITY TAB
      ========================= */}
      {activeTab === "Security" && (
        <div className="account-card">
          <SettingRow
            title="Email address"
            desc="The email address associated with your account"
            value={user.email}
            action={
              <button className="btn-outline" onClick={handleUpdateEmail}>
                Edit
              </button>
            }
          />

          <Divider />

          <SettingRow
            title="Password"
            desc="Set a unique password to protect your account"
            action={
              <button className="btn-outline" onClick={handleChangePassword}>
                Change Password
              </button>
            }
          />

          <Divider />

          <SettingRow
            title="2-step Verification"
            desc="Make your account extra secure."
            action={
              <Toggle
                checked={user.two_factor_enabled}
                onChange={handleToggle2FA}
                disabled={!user.email_verified_at}
              />
            }
          />

          <Divider />

          <SettingRow
            title="Delete Account"
            desc="This will permanently delete your account"
            action={
              <button className="btn-danger" onClick={handleDeleteAccount}>
                Delete
              </button>
            }
          />
        </div>
      )}

      {/* =========================
         PROFILE TAB
      ========================= */}
      {activeTab === "My Profile" && (
        <div className="account-card">
          <SettingRow
            title="Name"
            desc="This name is used across your account."
            value={user.name}
            action={
              <button className="btn-outline" onClick={handleUpdateName}>
                Edit
              </button>
            }
          />

          <Divider />

          <SettingRow
            title="Email"
            desc="Used for login and important notifications."
            value={user.email}
            action={
              !user.email_verified_at && (
                <button
                  className="btn-outline"
                  onClick={handleSendVerification}
                >
                  Verify Email
                </button>
              )
            }
          />
        </div>
      )}

      {/* =========================
         NOTIFICATIONS TAB
      ========================= */}
      {activeTab === "Notifications" && (
        <div className="account-card">
          <SettingRow
            title="Account activity"
            desc="Notifications about important account activity."
            action={
              <Toggle
                checked={user.account_activity_notifications}
                onChange={handleToggleNotifications}
                disabled={!user.email_verified_at}
              />
            }
          />

          <Divider />

          <SettingRow
            title="Return to Landing Page"
            desc="Leave the dashboard and go back to the public website."
            action={
              <button
                className="btn-outline"
                onClick={() => setShowConfirm(true)}
              >
                Back to Landing Page
              </button>
            }
          />
        </div>
      )}

      {/* =========================
         CONFIRM MODAL
      ========================= */}
      <ConfirmModal
        open={showConfirm}
        title="Return to Landing Page?"
        message="You will leave the dashboard and return to the public website."
        confirmText="Back to Landing Page"
        cancelText="Stay Here"
        onCancel={() => setShowConfirm(false)}
        onConfirm={async () => {
          await logout();
          alert("You have been logged out successfully.");
          navigate("/");
        }}
      />

      <EmailVerificationModal
        open={showVerifyModal}
        otp={otp}
        setOtp={setOtp}
        onClose={() => {
          setShowVerifyModal(false);
          setOtp("");
        }}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
