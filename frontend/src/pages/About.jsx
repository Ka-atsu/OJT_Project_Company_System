import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import PageShell from "../components/layouts/PageShell";

export default function About() {
  return (
    <PageShell className="py-4">
      {/* Header */}
      <Card className="mb-4">
        <Card.Body>
          <h1 className="fw-bold mb-2">About</h1>
          <p className="mb-3">
            We are a company focused on finding profitable locations,
            constructing buildings, and leasing them to generate long-term
            returns. Our process combines site selection, construction planning,
            and leasing strategy.
          </p>

          <div className="d-flex gap-2 flex-wrap">
            <Button as={Link} to="/projects" variant="success">
              View Projects
            </Button>

            <Button as={Link} to="/contact" variant="outline-secondary">
              Contact Us
            </Button>

            <Button as="a" href="/portfolio.pdf" download variant="primary">
              Download PDF
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Content */}
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Who We Are</Card.Title>
              <Card.Text>
                We help develop income-generating properties by selecting strong
                locations, building efficiently, and leasing to reliable
                tenants.
              </Card.Text>
              <Card.Text>
                Our goal is to maximize long-term value through smart planning,
                strong execution, and sustainable leasing decisions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="fw-bold">What We Do</Card.Title>
              <ul className="mb-0">
                <li>Identify and evaluate high-potential locations</li>
                <li>Plan and manage building construction</li>
                <li>Create leasing strategies and secure tenants</li>
                <li>Maintain and improve property value over time</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title className="fw-bold">Our Process</Card.Title>

              <Accordion defaultActiveKey="0" className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1) Site Selection</Accordion.Header>
                  <Accordion.Body>
                    We analyze demand, accessibility, zoning, and local market
                    conditions to identify locations with strong profit
                    potential.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    2) Construction Planning & Execution
                  </Accordion.Header>
                  <Accordion.Body>
                    We plan the build scope, manage timelines and resources, and
                    oversee construction quality to deliver a finished property
                    efficiently.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    3) Leasing & Profit Strategy
                  </Accordion.Header>
                  <Accordion.Body>
                    We position the building for the right tenants and apply a
                    leasing strategy designed to generate consistent returns.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Alert variant="info" className="mt-3 mb-0">
                Tip: Put your PDF in <code>frontend/public</code> and name it{" "}
                <code>portfolio.pdf</code> so this works:{" "}
                <code>/portfolio.pdf</code>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}