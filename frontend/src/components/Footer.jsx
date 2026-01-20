import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import EarthMovingEquipment from "../assets/Images/earthmovingEquipment.jpg";

export default function Footer() {
  const location = useLocation();
  const hideCta = location.pathname === "/contact";

  const cta = {
    eyebrow: "Next steps",
    title: "Let’s plan your materials supply",
    body: "Share your site details and required volumes, and we’ll help you determine the right materials and approach.",
    button: { label: "Start a Conversation", to: "/contact" },
    bg: EarthMovingEquipment,
  };

  return (
    <footer className="site-footer">
      {!hideCta && (
        <section
          className="section cta full-bleed footer-cta"
          style={{ "--cta-bg": `url(${cta.bg})` }}
        >
          <div className="cta-content">
            <span className="eyebrow">{cta.eyebrow}</span>
            <h2>{cta.title}</h2>
            <p>{cta.body}</p>
            <Button as={Link} to={cta.button.to} variant="light">
              {cta.button.label}
            </Button>
          </div>
        </section>
      )}

      <div className="site-footer-inner">
        <div className="site-footer-links">
          <small className="site-footer-copy">
            © {new Date().getFullYear()} The Company · All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
