export default function RecordsSection({ data }) {
  return (
    <section className="record-section">
      <div className="record-cards">
        <div className="record-inner">
          {data.items.map((item, i) => (
            <div key={i} className="record-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
