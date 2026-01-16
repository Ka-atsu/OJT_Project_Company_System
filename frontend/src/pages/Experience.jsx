import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PageShell from "../components/layouts/PageShell";

export default function Experience() {
  // Mock data (replace later with API)
  const experience = [
    {
      role: "Site Evaluation & Planning",
      company: "OJT Project Company System",
      date: "2025",
      details: [
        "Evaluated potential locations based on accessibility and demand.",
        "Prepared feasibility notes and basic cost considerations.",
        "Organized project requirements for development workflow.",
      ],
      tags: ["Site Selection", "Feasibility", "Planning"],
    },
    {
      role: "Construction & Coordination (Concept)",
      company: "Company Process",
      date: "2024",
      details: [
        "Planned construction steps and timeline based on project needs.",
        "Reviewed scope and quality requirements.",
        "Coordinated requirements for a build-and-lease model.",
      ],
      tags: ["Construction", "Timeline", "Quality"],
    },
    {
      role: "Leasing Strategy (Concept)",
      company: "Company Process",
      date: "2023",
      details: [
        "Identified target tenants and basic leasing approach.",
        "Considered market pricing and tenant demand.",
        "Focused on long-term profit and occupancy stability.",
      ],
      tags: ["Leasing", "Market Research", "ROI"],
    },
  ];

  return (
    <PageShell className="py-4">
      <div className="mb-3">
        <h1 className="fw-bold mb-1">Experience</h1>
        <p className="text-muted mb-0">
          Work process and experience related to site selection, construction,
          and leasing.
        </p>
      </div>

      <Row className="g-4">
        {experience.map((item, idx) => (
          <Col key={idx} xs={12}>
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                  <div>
                    <h5 className="fw-bold mb-1">{item.role}</h5>
                    <div className="text-muted">
                      <small>
                        {item.company} • {item.date}
                      </small>
                    </div>
                  </div>
                </div>

                <hr />

                <ul className="mb-3">
                  {item.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <div>
                  {item.tags.map((t) => (
                    <Badge key={t} bg="secondary" className="me-1 mb-1">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </PageShell>
  );
}