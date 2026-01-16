import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Safety() {
  const commitments = [
    {
      title: "Safety-First Culture",
      desc: "We plan every job with safety as the first priority — people, site, and public protection.",
    },
    {
      title: "Risk Assessment & Method Statements",
      desc: "We identify hazards, assess risk, and follow documented safe work methods on every project.",
    },
    {
      title: "Training & PPE",
      desc: "Our team uses appropriate PPE and follows site rules, induction, and ongoing safety training.",
    },
    {
      title: "Site Housekeeping",
      desc: "We maintain a clean, organized site to reduce incidents and improve productivity.",
    },
    {
      title: "Quality + Safety Checks",
      desc: "Regular inspections ensure compliance, safe practices, and a high standard of workmanship.",
    },
    {
      title: "Incident Reporting",
      desc: "We encourage reporting and continuous improvement — learning prevents repeat incidents.",
    },
  ];

  return (
    <PageShell
      title="Safety Commitment"
      subtitle="Our safety commitment and statement: protecting our people, clients, and community on every site."
    >
      <div className="p-4 bg-light border rounded-3 mb-4">
        <h2 className="h5 fw-bold mb-2">Safety Statement</h2>
        <p className="text-muted mb-0">
          We are committed to providing a safe working environment for our
          employees, subcontractors, clients, and the public. Safety is
          integrated into planning, execution, and supervision on every project.
        </p>
      </div>

      <Row className="g-3">
        {commitments.map((c) => (
          <Col md={6} key={c.title}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold">{c.title}</Card.Title>
                <Card.Text className="text-muted mb-0">{c.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 p-4 border rounded-3">
        <h2 className="h5 fw-bold mb-2">Work with a safety-focused team</h2>
        <p className="text-muted mb-3">
          Planning a project? Contact us to discuss timelines, site
          requirements, and safe delivery.
        </p>
        <Button as={Link} to="/contact" variant="primary">
          Contact Us
        </Button>
      </div>
    </PageShell>
  );
}
