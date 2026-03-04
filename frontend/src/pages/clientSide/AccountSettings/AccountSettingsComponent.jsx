export function SettingRow({ title, desc, value, action }) {
  return (
    <div className="setting-row">
      <div className="setting-text">
        <div className="setting-title">{title}</div>
        {desc && <div className="setting-desc">{desc}</div>}
        {value && <div className="setting-value">{value}</div>}
      </div>
      {action && <div className="setting-action">{action}</div>}
    </div>
  );
}

export function Divider() {
  return <div className="divider" />;
}

export function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider" />
    </label>
  );
}
