import "../../css/Client/clientAccountSettings.css";

export default function AccountNav({ active, onChange }) {
  const tabs = ["My Profile", "Security", "Notifications"];

  return (
    <nav className="account-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${active === tab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
