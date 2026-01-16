import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import PageShell from "../../components/layouts/PageShell";

export default function Projects() {
  // Mock data (replace later with API)
  const projects = [
    {
      id: 1,
      title: "Commercial Building Lease Project",
      description:
        "Site selection, construction planning, and leasing strategy.",
      category: "Commercial",
      tech: ["Site Analysis", "Planning", "Leasing"],
      featured: true,
      year: 2025,
    },
    {
      id: 2,
      title: "Mixed-Use Development",
      description: "Evaluation of demand and profitability for mixed-use area.",
      category: "Mixed-Use",
      tech: ["Market Research", "Feasibility", "ROI"],
      featured: false,
      year: 2024,
    },
    {
      id: 3,
      title: "Residential Apartment Leasing",
      description: "Construction coordination and tenant-ready leasing plan.",
      category: "Residential",
      tech: ["Construction", "Operations", "Leasing"],
      featured: false,
      year: 2023,
    },
  ];

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | featured

  const filtered = useMemo(() => {
    let data = [...projects];

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter category
    if (category !== "All") {
      data = data.filter((p) => p.category === category);
    }

    // Sort
    if (sortBy === "featured") {
      data.sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (sortBy === "newest") {
      data.sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      data.sort((a, b) => a.year - b.year);
    }

    return data;
  }, [projects, query, category, sortBy]);

  return (
    <PageShell className="py-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h1 className="fw-bold mb-1">Projects</h1>
          <p className="text-muted mb-0">
            Browse projects, search by keywords, and filter by category.
          </p>
        </div>

        <Button as="a" href="/portfolio.pdf" download variant="outline-primary">
          Download PDF
        </Button>
      </div>

      {/* Controls */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} md={6}>
              <Form.Label className="fw-semibold">Search</Form.Label>
              <InputGroup>
                <Form.Control
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, description, or tag..."
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuery("")}
                >
                  Clear
                </Button>
              </InputGroup>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label className="fw-semibold">Sort</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="featured">Featured first</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">
          Showing {filtered.length} of {projects.length}
        </small>
      </div>

      <Row className="g-4">
        {filtered.map((p) => (
          <Col key={p.id} xs={12} md={6} lg={4}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <Card.Title className="fw-bold mb-1">{p.title}</Card.Title>
                  {p.featured && <Badge bg="success">Featured</Badge>}
                </div>

                <div className="text-muted mb-2">
                  <small>
                    {p.category} • {p.year}
                  </small>
                </div>

                <Card.Text className="mb-3">{p.description}</Card.Text>

                <div className="mb-3">
                  {p.tech.map((t) => (
                    <Badge key={t} bg="secondary" className="me-1 mb-1">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto d-flex gap-2">
                  <Button as={Link} to={`/projects/${p.id}`} variant="primary">
                    View Details
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        window.location.origin + `/projects/${p.id}`
                      )
                    }
                  >
                    Copy Link
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filtered.length === 0 && (
        <Card className="mt-4">
          <Card.Body>
            <p className="mb-0">
              No projects found. Try a different keyword or category.
            </p>
          </Card.Body>
        </Card>
      )}
    </PageShell>
  );
}