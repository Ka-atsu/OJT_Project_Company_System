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
          <div className="services-image-reveal">
            <div
              className="services-image-wrap"
              style={{ "--img": `url(${image})` }}
            >
              {/* NEW: black cover */}
              <div className="services-image-cover" aria-hidden="true" />

              <img src={image} alt={title} className="services-image" />

              <div className="services-image-shards" aria-hidden="true">
                <span className="shard shard--1" />
                <span className="shard shard--2" />
                <span className="shard shard--3" />
                <span className="shard shard--4" />
              </div>
            </div>
          </div>
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
