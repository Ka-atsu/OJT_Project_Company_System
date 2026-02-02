import { Link, useLocation } from "react-router-dom";
import { ImgEarthmoving } from "../../assets/images";
import logo from "../../assets/Images/logo.jpg";

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
          <div className="footer-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/projects" className="footer-link">Projects</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <h4 className="footer-heading">CONTACT</h4>
            <p>
              Lot 3739 National Highway, 3/F CBD Building Brgy. Pulo, Cabuyao City,
              Laguna, Philippines
            </p>
            <p>cliberduche.corp@yahoo.com</p>
            <p>+63 49 546-6107 / 0967-302-6643</p>
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

    {/* INLINE STYLES */}
      <style>{`
  .site-footer-main {
  background-color: #ffffff;
  padding: 48px 32px;
  border-top: 1px solid #e5e5e5;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

/* CENTERED INNER CONTAINER */
.site-footer-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  column-gap: 120px; /* THIS creates left–center–right illusion */
  align-items: start;
}

/* ---------- COLUMN ALIGNMENT ---------- */

/* LEFT */
.footer-brand {
  text-align: left;
   display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* CENTER */
.site-footer-inner > .footer-col:nth-child(2) {
  text-align: center;
}

/* RIGHT */
.site-footer-inner > .footer-col:nth-child(3) {
  text-align: left;
}

/* ---------- BRAND ---------- */
.footer-brand img.footer-logo {
  width: 160px;
  height: auto;
  margin-bottom: 16px;
  
}

.footer-title-logo {
  display: flex;
  align-items: center; /* vertically center image and text */
  gap: 12px; /* space between image and text */
}

.footer-title-logo img.footer-logo {
  width: 60px;
  height: auto;
}

.footer-title-logo h4.footer-heading {
  margin: 0; /* remove extra margin */
  font-size: 16px; /* adjust to your desired size */
  font-weight: 700;
}

/* ---------- HEADINGS ---------- */
.footer-heading {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
  color: #000;
}

/* ---------- LINKS ---------- */
.footer-link {
  display: block;
  margin-bottom: 6px;
  color: #333;
  text-decoration: none;
}

.footer-link:hover {
  color: #0b5ed7;
}

/* ---------- TEXT ---------- */
.footer-col p {
  margin-bottom: 8px;
  line-height: 1.6;
}

/* ---------- FOOTER BOTTOM ---------- */
.site-footer-bottom {
  border-top: 1px solid #e5e5e5;
  margin-top: 32px;
  padding: 14px 32px;
}

.site-footer-copy {
  text-align: center;
  font-size: 12px;
  color: #666;
}

/* ---------- MOBILE ---------- */
@media (max-width: 768px) {
  .site-footer-inner {
    grid-template-columns: 1fr;
    column-gap: 0;
    text-align: center;
  }

  .footer-brand img.footer-logo {
    margin: 0 auto 16px;
  }
}

      `}</style>
    </>
  );
}


