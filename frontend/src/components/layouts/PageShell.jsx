import Container from "react-bootstrap/Container";

/**
 * Reusable page wrapper for consistent spacing
 * pad = true  → normal pages
 * pad = false → full-bleed (hero, landing pages)
 * 
 * 
 * SCRAPPED
 */
export default function PageShell({
  title,
  subtitle,
  children,
  pad = true,
  fluid = true,
}) {
  return (
    <Container fluid={fluid} className={pad ? "py-3 page-pad" : "p-0"}>
      {(title || subtitle) && (
        <header className={pad ? "mb-4" : "mb-0"}>
          {title && <h2 className="mb-1">{title}</h2>}
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </header>
      )}

      {children}
    </Container>
  );
}
