import { useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import PageShell from "../components/layouts/PageShell";

export default function Skills() {
  // Mock skills data (replace later with API)
  const skillGroups = useMemo(
    () => [
      {
        title: "Site & Location Analysis",
        skills: [
          "Site Selection",
          "Zoning Check",
          "Accessibility Review",
          "Foot Traffic Analysis",
          "Feasibility Study",
        ],
      },
      {
        title: "Construction & Planning",
        skills: [
          "Project Planning",
          "Cost Estimation",
          "Timeline Management",
          "Quality Control",
          "Contractor Coordination",
        ],
      },
      {
        title: "Leasing & Business Strategy",
        skills: [
          "Tenant Targeting",
          "Rental Pricing Strategy",
          "Lease Management",
          "Market Research",
          "ROI Analysis",
        ],
      },
      {
        title: "Tools / Documentation",
        skills: [
          "MS Excel",
          "Google Maps",
          "AutoCAD (basic)",
          "Reports & Documentation",
          "Presentation Skills",
        ],
      },
    ],
    []
  );

  const allSkills = useMemo(() => {
    return skillGroups.flatMap((g) =>
      g.skills.map((s) => ({ group: g.title, name: s }))
    );
  }, [skillGroups]);

  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return skillGroups;

    const q = query.toLowerCase();
    // Filter each group by skill match
    return skillGroups
      .map((g) => ({
        ...g,
        skills: g.skills.filter((s) => s.toLowerCase().includes(q)),
      }))
      .filter((g) => g.skills.length > 0);
  }, [skillGroups, query]);

  const matchCount = useMemo(() => {
    if (!query.trim()) return allSkills.length;
    const q = query.toLowerCase();
    return allSkills.filter((s) => s.name.toLowerCase().includes(q)).length;
  }, [allSkills, query]);

  return (
    <PageShell className="py-4">
      <div className="mb-3">
        <h1 className="fw-bold mb-1">Skills</h1>
        <p className="text-muted mb-0">
          Core skills used for location selection, construction planning, and
          leasing strategy.
        </p>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col xs={12} md={8}>
              <Form.Label className="fw-semibold">Search skills</Form.Label>
              <InputGroup>
                <Form.Control
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a skill (e.g., zoning, cost, leasing)..."
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuery("")}
                >
                  Clear
                </Button>
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <div className="text-md-end">
                <span className="text-muted">Matches: </span>
                <Badge bg="primary">{matchCount}</Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {filteredGroups.map((group) => (
          <Col key={group.title} xs={12} md={6}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="fw-bold">{group.title}</Card.Title>
                <div className="mt-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} bg="secondary" className="me-1 mb-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredGroups.length === 0 && (
        <Card className="mt-4">
          <Card.Body>
            <p className="mb-0">No skills found. Try another keyword.</p>
          </Card.Body>
        </Card>
      )}
    </PageShell>
  );
}