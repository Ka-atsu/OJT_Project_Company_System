import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PageShell from "../components/layouts/PageShell";

export default function NotFound() {
  return (
    <PageShell className="py-4">
      <Card>
        <Card.Body>
          <h1 className="fw-bold mb-2">404 - Page Not Found</h1>
          <p className="text-muted">
            The page you are looking for does not exist or was moved.
          </p>

          <Button as={Link} to="/" variant="primary">
            Go to Home
          </Button>
        </Card.Body>
      </Card>
    </PageShell>
  );
}