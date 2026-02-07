import { Link, useLocation } from "react-router-dom";
import { ImgEarthmoving } from "../../assets/images";
import logo from "../../assets/Images/logo.jpg";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  const location = useLocation();
  const hideCta = location.pathname === "/contact";

  const cta = {
    eyebrow: "Next steps",
    title: "Let’s plan your materials supply",
    body: "Share your site details and required volumes, and we’ll help you determine the right materials and approach.",
    button: { label: "Start a Conversation", to: "/contact" },
    bg: ImgEarthmoving,
  };

  return (
     <>
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

            {/* NEW BUTTON */}
            <Link to={cta.button.to} className="btn btn-filled">
              {cta.button.label}
            </Link>
          </div>
        </section>
      )}

      {/* MAIN FOOTER */}
      <div className="site-footer-main">
        <div className="site-footer-inner">
          {/* BRAND */}
          <div className="footer-col footer-brand">
            <div className="footer-title-logo">
            <img src={logo} alt="Cliberduche Logo" className="footer-logo" />
            <h4 className="footer-heading">Cliberduche Corporation</h4>
            </div>
            
            <p>
              Leading provider of backfill, aggregates, and land resources for
              infrastructure and development projects across the Philippines.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col footer-links-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/projects" className="footer-link">Projects</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          {/* CONTACT */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">CONTACT</h4>
            <div className="contact-item">
              <FiMapPin className="contact-icon" />
              <p>Lot 3739 National Highway, 3/F CBD Building Brgy. Pulo, Cabuyao City, Laguna, Philippines</p>
            </div>
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <p><a href="mailto:cliberduche.corp@yahoo.com">cliberduche.corp@yahoo.com</a></p>
            </div>
            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <p><a href="tel:+634954566107">+63 49 546-6107</a> / <a href="tel:+639673026643">0967-302-6643</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-links">
          <small className="site-footer-copy">
            © {new Date().getFullYear()} CLIBERDUCHE · All rights reserved
          </small>
        </div>
      </div>
    </footer>
    </>
  );
}


