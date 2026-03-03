export default function Row({ label, help, right, children }) {
  return (
    <div className="as-row">
      <div className="as-row__left">
        <div className="as-row__label">{label}</div>
        {help && <div className="as-row__help">{help}</div>}
        {children}
      </div>
      <div className="as-row__right">{right}</div>
    </div>
  );
}
