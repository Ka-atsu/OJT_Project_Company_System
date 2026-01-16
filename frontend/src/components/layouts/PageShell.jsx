import Container from "react-bootstrap/Container";

/**
 * Reusable page wrapper for consistent spacing + optional heading.
 */
export default function PageShell({ title, subtitle, children }) {
  return (
    <Container className="py-4">
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="mb-1">{title}</h2>}
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </header>
      )}

      {children}
    </Container>
  );
}