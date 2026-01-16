import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      title: "Residential Construction",
      desc: "Custom homes, extensions, renovations, and remodeling.",
      tags: ["New build", "Renovations", "Extensions"],
    },
    {
      title: "Commercial Projects",
      desc: "Offices, retail fit-outs, small developments, and refurbishments.",
      tags: ["Fit-out", "Refurbishment", "Compliance"],
    },
    {
      title: "Project Management",
      desc: "Planning, scheduling, budgeting, and end-to-end site coordination.",
      tags: ["Scheduling", "Cost control", "Delivery"],
    },
    {
      title: "Maintenance & Repairs",
      desc: "Ongoing maintenance, defect fixes, and site improvements.",
      tags: ["Repairs", "Upkeep", "Quick response"],
    },
    {
      title: "Site Preparation",
      desc: "Demolition coordination, groundwork, and site readiness support.",
      tags: ["Groundworks", "Prep", "Coordination"],
    },
    {
      title: "Finishing & Handover",
      desc: "Quality checks, snagging, documentation, and handover support.",
      tags: ["QA/QC", "Handover", "Warranty"],
    },
  ];

  return (
    <PageShell
      title="Services"
      subtitle="Construction solutions for residential and commercial needs — delivered safely and on time."
    >
      <Row className="g-3">
        {services.map((s) => (
          <Col md={6} lg={4} key={s.title}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold">{s.title}</Card.Title>
                <Card.Text className="text-muted">{s.desc}</Card.Text>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  {s.tags.map((t) => (
                    <Badge bg="secondary" key={t}>
                      {t}
                    </Badge>
                  ))}
                </div>

                <Button as={Link} to="/contact" variant="outline-primary">
                  Request a Quote
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 p-4 bg-light border rounded-3">
        <h2 className="h5 fw-bold mb-2">Not sure what you need?</h2>
        <p className="text-muted mb-3">
          Tell us about your project and we’ll recommend the best approach and
          timeline.
        </p>
        <Button as={Link} to="/contact" variant="primary">
          Contact Us
        </Button>
      </div>
    </PageShell>
  );
}