import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ABOUT_MENU = [
  { label: "Mission and Vision", hash: "#about-missionVision" },
  { label: "About Us", hash: "#about-whyUs" },
  { label: "Background", hash: "#about-story" },
  { label: "Core Values", hash: "#about-coreValues" },
  { label: "Our Team", hash: "#about-team" },
  { label: "Company Profile", hash: "#about-companyProfile" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const navRef = useRef(null);
  const wrapRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on route change
  useEffect(() => {
    setAboutOpen(false);
  }, [location.pathname, location.hash]);

  // click outside to close
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setAboutOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  // scroll after we arrive at /about#...
  useEffect(() => {
    if (location.pathname !== "/about") return;
    if (!location.hash) return;
    if (!location.hash.startsWith("#about-")) return;

    // wait for DOM paint so anchors exist
    requestAnimationFrame(() => {
      scrollToHash(location.hash);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    const navH = navRef.current?.offsetHeight ?? 72;

    const currentY = window.scrollY;
    const targetY = el.getBoundingClientRect().top + window.scrollY;

    const goingDown = targetY > currentY;

    // If we're going DOWN far enough, navbar will hide -> no offset needed.
    // If it's a small jump (near top), navbar won't hide -> offset needed.
    const willHide = goingDown && targetY - currentY > 140;

    const offset = goingDown ? (willHide ? 0 : navH + 16) : navH + 16;

    window.scrollTo({ top: targetY - offset, behavior: "smooth" });
  };

  const goToAboutSection = (hash) => {
    if (location.pathname !== "/about") {
      navigate(`/about${hash}`); // ✅ Navbar useEffect will scroll after route changes
      return;
    }
    scrollToHash(hash);
  };

  return (
    <nav
      ref={navRef}
      className={`site-nav ${scrolled ? "is-scrolled" : ""} ${
        hidden ? "is-hidden" : ""
      }`}
    >
      <div className="site-nav-inner">
        <NavLink to="/" className="site-brand">
          CLIBERDUCHE
        </NavLink>

        <div className="site-links">
          <div className="nav-dd" ref={wrapRef}>
            <button
              type="button"
              className={`site-link nav-dd-btn ${aboutOpen ? "is-open" : ""}`}
              onClick={() => setAboutOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={aboutOpen}
            >
              About <span className="nav-dd-caret">▾</span>
            </button>

            {aboutOpen && (
              <div className="nav-dd-menu" role="menu">
                {ABOUT_MENU.map((item) => (
                  <button
                    key={item.hash}
                    type="button"
                    className="nav-dd-item"
                    role="menuitem"
                    onClick={() => goToAboutSection(item.hash)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/services" className="site-link">
            Services
          </NavLink>
          <NavLink to="/projects" className="site-link">
            Projects
          </NavLink>
        </div>

        <NavLink to="/contact" className="btn btn-filled nav-btn">
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
