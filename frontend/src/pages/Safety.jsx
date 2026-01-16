import PageShell from "../components/layouts/PageShell";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default function Safety() {
  const commitments = [
    {
      title: "Safety-First Culture",
      desc: "Safety is built into planning and daily operations across every site and project.",
    },
    {
      title: "Risk Assessments",
      desc: "We identify hazards early and apply practical controls before work begins.",
    },
    {
      title: "Method Statements",
      desc: "Work is carried out using documented safe work procedures and site rules.",
    },
    {
      title: "Training & PPE",
      desc: "Site inductions, toolbox talks, and proper PPE are required for all personnel.",
    },
    {
      title: "Housekeeping & Access",
      desc: "We maintain clean, organized sites with safe access routes and clear signage.",
    },
    {
      title: "Inspections & Reporting",
      desc: "Regular checks, incident reporting, and continuous improvement are standard practice.",
    },
  ];

  const standards = [
    "Site inductions and daily briefings (toolbox talks)",
    "Documented risk assessments and safe work methods",
    "PPE compliance and equipment checks",
    "Clear signage, barriers, and controlled access",
    "Emergency procedures and incident reporting",
    "Ongoing supervision and quality inspections",
  ];

  return (
    <PageShell>
      {/* Header / Business CTA */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4 p-md-5">
          <Row className="align-items-center g-4">
            <Col md={12}>
              <h2 className="h5 fw-bold mb-3">Safety Statement</h2>

              <p className="text-muted">
                CLIBERDUCHE CORPORATION is vitally interested in its employees’
                health and safety. Protecting employee or occupational disease
                is a major continuing objective. CLIBERDUCHE CORPORATION will
                make every effort to provide a safe and a healthy work
                environment. All supervisors and workers must be dedicated to
                continuing to reduce the risk of injury.
              </p>

              <p className="text-muted">
                CLIBERDUCHE CORPORATION, as employer, is ultimately responsible
                for worker health and safety.
              </p>

              <p className="text-muted">
                As a President of CLIBERDUCHE CORPORATION, I personally promise
                that every reasonable precaution will be taken to protect our
                workers and thus hiring a highly experienced Safety Officer is
                the key to ensure safety of each personnel and making the work
                space an safe environment.
              </p>

              <p className="text-muted">
                Supervisors will be held accountable for the health and safety
                of workers under their supervision. Supervisors are responsible
                to ensure that machinery and equipment are safe and that workers
                work in compliance with established safe work practices and
                procedures. Workers must receive adequate training in their
                specific work tasks to protect their health and safety.
              </p>

              <p className="text-muted">
                Every worker must protect his or her own health and safety by
                working in compliance with the law and with safe work practices
                and procedures established by the company.
              </p>

              <p className="text-muted mb-0">
                It is in the best interest of all parties to consider health and
                safety in every activity. Commitment to health and safety must
                form an integral part of this organization from the president to
                the workers.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Commitments */}
      <section className="mb-5">
        <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
          <div>
            <h3 className="h5 fw-bold mb-1">Our Safety Commitments</h3>
            <p className="text-muted mb-0">
              What we do to keep sites safe and compliant.
            </p>
          </div>
        </div>

        <Row className="g-3">
          {commitments.map((c) => (
            <Col md={6} lg={4} key={c.title}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-semibold">{c.title}</Card.Title>
                  <Card.Text className="text-muted mb-0">{c.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Standards / What clients can expect */}
      <Row className="g-3">
        <Col lg={7}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h3 className="h5 fw-bold mb-2">What You Can Expect On Site</h3>
              <p className="text-muted">
                Our teams follow consistent standards so projects run safely and
                efficiently.
              </p>

              <ListGroup variant="flush">
                {standards.map((s) => (
                  <ListGroup.Item key={s} className="px-0">
                    {s}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h3 className="h5 fw-bold mb-2">
                Compliance & Continuous Improvement
              </h3>
              <p className="text-muted">
                We review safety performance regularly and improve processes
                across projects.
              </p>

              <div className="p-3 bg-light border rounded-3">
                <div className="fw-semibold mb-1">Need documents?</div>
                <div className="text-muted small">
                  Later you can add downloads here (Safety Policy PDF, RAMS
                  templates, etc.).
                </div>
              </div>

              <Button
                as={Link}
                to="/contact"
                variant="outline-primary"
                className="mt-3 w-100"
              >
                Request Safety Information
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom CTA */}
      <Card className="mt-5 border-0 bg-light">
        <Card.Body className="p-4 text-center">
          <h3 className="h5 fw-bold mb-2">
            Work with a safety-focused construction team
          </h3>
          <p className="text-muted mb-3">
            Contact us to discuss site requirements, timelines, and safe
            delivery for your project.
          </p>
          <Button as={Link} to="/contact" variant="primary">
            Contact Us
          </Button>
        </Card.Body>
      </Card>
    </PageShell>
  );
}
