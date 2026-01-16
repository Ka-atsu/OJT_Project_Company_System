import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      title: "Residential Construction",
      desc: "Custom homes, extensions, and renovations.",
    },
    {
      title: "Commercial Projects",
      desc: "Fit-outs, offices, retail, and small developments.",
    },
    {
      title: "Project Management",
      desc: "Planning, budgeting, timelines, and site coordination.",
    },
  ];

  const highlights = [
    "Licensed & Insured",
    "On-time Delivery",
    "Quality Materials",
    "Clear Communication",
  ];

  return (
    <PageShell
      title="Building with quality. Delivering with trust."
      subtitle="Construction services for residential and commercial projects — from planning to handover."
    >
      {/* HERO */}
      <div className="p-4 p-md-5 bg-light border rounded-3">
        <Row className="align-items-center g-4">
          <Col md={7}>
            <h1 className="fw-bold mb-3">
              Your construction partner from start to finish.
            </h1>
            <p className="text-muted mb-4">
              We handle builds, renovations, and project management with a focus
              on safety, timelines, and workmanship.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Button as={Link} to="/projects" variant="primary">
                View Projects
              </Button>
              <Button as={Link} to="/contact" variant="outline-primary">
                Get a Quote
              </Button>
            </div>
          </Col>

          <Col md={5}>
            <div className="bg-white border rounded-3 p-3">
              <div className="fw-semibold mb-2">Quick highlights</div>
              <div className="d-flex flex-wrap gap-2">
                {highlights.map((t) => (
                  <Badge bg="secondary" key={t}>
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* SERVICES */}
      <section className="mt-5">
        <h2 className="h4 fw-bold mb-3">Services</h2>
        <Row className="g-3">
          {services.map((s) => (
            <Col md={4} key={s.title}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-semibold">{s.title}</Card.Title>
                  <Card.Text className="text-muted">{s.desc}</Card.Text>
                  <Button
                    as={Link}
                    to="/services"
                    variant="link"
                    className="p-0"
                  >
                    Learn more →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* WHY US */}
      <section className="mt-5">
        <Row className="g-3">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold">Why choose us</Card.Title>
                <ul className="text-muted mb-0">
                  <li>Transparent quotes & timelines</li>
                  <li>Safety-first site management</li>
                  <li>Quality workmanship & materials</li>
                  <li>Clear updates throughout the build</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold">How it works</Card.Title>
                <ol className="text-muted mb-0">
                  <li>Site visit & requirements</li>
                  <li>Quote & scope confirmation</li>
                  <li>Build schedule & execution</li>
                  <li>Handover & warranty support</li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* CTA */}
      <section className="mt-5 text-center p-4 bg-light border rounded-3">
        <h2 className="h4 fw-bold mb-2">Ready to start your project?</h2>
        <p className="text-muted mb-3">
          Tell us what you’re building and we’ll get back with next steps.
        </p>
        <Button as={Link} to="/contact" variant="primary">
          Contact Us
        </Button>
      </section>
    </PageShell>
  );
}