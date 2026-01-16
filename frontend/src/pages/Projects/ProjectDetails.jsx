import { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import PageShell from "../../components/layouts/PageShell";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Same mock data as Projects.jsx (keep consistent for now)
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Commercial Building Lease Project",
        description:
          "Site selection, construction planning, and leasing strategy for a commercial building project.",
        category: "Commercial",
        tech: ["Site Analysis", "Planning", "Leasing"],
        featured: true,
        year: 2025,
        links: {
          demo: "https://example.com",
          repo: "https://github.com/example",
        },
      },
      {
        id: 2,
        title: "Mixed-Use Development",
        description:
          "Evaluation of demand and profitability for a mixed-use development area, including feasibility and ROI study.",
        category: "Mixed-Use",
        tech: ["Market Research", "Feasibility", "ROI"],
        featured: false,
        year: 2024,
        links: {
          demo: "https://example.com",
          repo: "https://github.com/example",
        },
      },
      {
        id: 3,
        title: "Residential Apartment Leasing",
        description:
          "Construction coordination and tenant-ready leasing plan for a residential apartment project.",
        category: "Residential",
        tech: ["Construction", "Operations", "Leasing"],
        featured: false,
        year: 2023,
        links: {
          demo: "https://example.com",
          repo: "https://github.com/example",
        },
      },
    ],
    []
  );

  const projectId = Number(id);
  const project = projects.find((p) => p.id === projectId);

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      alert("Copy failed. Please copy the URL manually.");
    }
  };

  if (!project) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          Project not found. Go back to <Link to="/projects">Projects</Link>.
        </Alert>
      </Container>
    );
  }

  return (
    <PageShell className="py-4">
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
        <div>
          <h1 className="fw-bold mb-1">{project.title}</h1>
          <div className="text-muted">
            <small>
              {project.category} • {project.year}
            </small>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="outline-primary" onClick={handleCopyLink}>
            Copy Link
          </Button>
          <Button as="a" href="/portfolio.pdf" download variant="success">
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-4">
            <Col xs={12} lg={8}>
              <h5 className="fw-bold">Description</h5>
              <p className="mb-0">{project.description}</p>

              <hr />

              <h5 className="fw-bold">Technologies / Tags</h5>
              <div>
                {project.tech.map((t) => (
                  <Badge key={t} bg="secondary" className="me-1 mb-1">
                    {t}
                  </Badge>
                ))}
              </div>

              <hr />

              <h5 className="fw-bold">Project Links</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  as="a"
                  href={project.links?.demo}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Demo / Website
                </Button>
                <Button
                  as="a"
                  href={project.links?.repo}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-dark"
                >
                  Repository
                </Button>
              </div>
            </Col>

            <Col xs={12} lg={4}>
              <Card>
                <Card.Body>
                  <h5 className="fw-bold">Quick Info</h5>
                  <p className="mb-2">
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p className="mb-2">
                    <strong>Year:</strong> {project.year}
                  </p>
                  <p className="mb-0">
                    <strong>Status:</strong>{" "}
                    {project.featured ? (
                      <Badge bg="success">Featured</Badge>
                    ) : (
                      <Badge bg="info">Standard</Badge>
                    )}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 flex-wrap">
        <Button as={Link} to="/projects" variant="outline-secondary">
          Back to Projects
        </Button>
        <Button as={Link} to="/contact" variant="outline-primary">
          Contact Us
        </Button>
      </div>
    </PageShell>
  );
}