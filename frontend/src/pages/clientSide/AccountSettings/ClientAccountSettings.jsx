import { useState, useEffect  } from "react";
import AccountNav from "../../../components/navigation/AccountNav";
import {
  SettingRow,
  Divider,
  Toggle,
} from "./AccountSettingsComponent";
import "./clientAccountSettings.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./confirmModal";
import { logout } from "../../authentication/auth.service";

export default function ClientAccountSettings() {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="account-settings">
      <h2 className="account-title">Account Settings</h2>

      <AccountNav active={activeTab} onChange={setActiveTab} />

      {activeTab === "Security" && (
        <div className="account-card">
          <SettingRow
            title="Email address"
            desc="The email address associated with your account"
            value={user?.email || ""}
            action={<button className="btn-outline">Edit</button>}
          />

          <Divider />

          <SettingRow
            title="Password"
            desc="Set a unique password to protect your account"
            action={<button className="btn-outline">Change Password</button>}
          />

          <Divider />

          <SettingRow
            title="2-step Verification"
            desc="Make your account extra secure."
            action={<Toggle defaultChecked />}
          />

          <Divider />

          <SettingRow
            title="Delete Account"
            desc="This will permanently delete your account"
            action={<button className="btn-danger">Delete</button>}
          />
        </div>
      )}

      {activeTab === "My Profile" && (
        <div className="account-card">
          <SettingRow
            title="Name"
            desc="This name is used across your account."
             value={user?.name || ""}
            action={<button className="btn-outline">Edit</button>}
          />

          <Divider />

          <SettingRow
            title="Email"
            desc="Used for login and important notifications."
             value={user?.email || ""}
            action={<button className="btn-outline">Change</button>}
          />
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="account-card">
          <SettingRow
            title="Account activity"
            desc="Notifications about important account activity."
            action={<Toggle defaultChecked />}
          />

          <Divider />

          <SettingRow
            title="Security alerts"
            desc="Alerts for new logins or unusual activity."
            action={<Toggle defaultChecked />}
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
      {/* Confirmation modal for going back to the landing page */}
      {/* Verified! it also logout the account after returning */}
      <ConfirmModal
          open={showConfirm}
          title="Return to Landing Page?"
          message="You will leave the dashboard and return to the public website."
          confirmText="Back to Landing Page"
          cancelText="Stay Here"
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            await logout();   // log out user
            alert("You have been logged out successfully.");//just for confirmation can be change to a popup
            navigate("/");    // redirect to landing page
          }}
/>

    </div>
  );
}
