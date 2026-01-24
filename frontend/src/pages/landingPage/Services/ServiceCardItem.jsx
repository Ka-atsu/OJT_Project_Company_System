import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function ServiceCardItem({ i, title, desc, tags, image }) {
  const isReverse = i % 2 === 1;

  return (
    <div className="services-card">
      <Row
        className={`services-card-row g-4 align-items-center ${
          isReverse ? "flex-md-row-reverse" : ""
        }`}
      >
        <Col md={6} className="services-card-image">
          <img src={image} alt={title} className="services-image" />
        </Col>

        <Col md={6} className="services-card-body">
          <div className="services-card-body-inner">
            <h3 className="services-title">
              <span className="services-index">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {title}
            </h3>

            <p className="services-desc">{desc}</p>

            <div className="services-tags">
              {tags.map((t) => (
                <span key={t} className="services-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
