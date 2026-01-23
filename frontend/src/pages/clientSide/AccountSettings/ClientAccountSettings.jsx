import { useState } from "react";
import AccountNav from "../../../components/navigation/AccountNav";
import {
  SettingRow,
  Divider,
  Toggle,
} from "../../../components/client/AccountSettingsComponent";
import "./clientAccountSettings.css";

export default function ClientAccountSettings() {
  const [activeTab, setActiveTab] = useState("Security");

  return (
    <div className="account-settings">
      <h2 className="account-title">Account Settings</h2>

      <AccountNav active={activeTab} onChange={setActiveTab} />

      {activeTab === "Security" && (
        <div className="account-card">
          <SettingRow
            title="Email address"
            desc="The email address associated with your account"
            value="alex.someone@gmail.com"
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
            value="Alex Assenmacher"
            action={<button className="btn-outline">Edit</button>}
          />

          <Divider />

          <SettingRow
            title="Email"
            desc="Used for login and important notifications."
            value="alex.someone@gmail.com"
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
        </div>
      )}
    </div>
  );
}
