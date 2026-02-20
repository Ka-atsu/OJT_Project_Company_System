import {
  FaLayerGroup,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaGlobeAsia,
} from "react-icons/fa";

const ICONS = {
  layers: FaLayerGroup,
  calendar: FaCalendarAlt,
  map: FaMapMarkedAlt,
  globe: FaGlobeAsia,
};

export default function RecordsSection({ data }) {
  return (
    <section className="record-section">
      <div className="record-cards">
        <div className="record-inner">
          {data.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={i} className="record-card">
                <div className={`record-icon icon-${item.icon}`}>
                  <Icon />
                </div>

                <div className="record-value">{item.value}</div>
                <div className="record-label">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}