export default function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`as-switch ${checked ? "is-on" : ""}`}
      onClick={() => onChange(!checked)}
    />
  );
}
