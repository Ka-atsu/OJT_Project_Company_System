import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.jpg";
import useAuthUser from "../../pages/authentication/useAuthUser";

const ABOUT_MENU = [
  { label: "Background", hash: "#about-story" },
  { label: "About Us", hash: "#about-whyUs" },
  { label: "Mission and Vision", hash: "#about-missionVision" },
  { label: "Core Values", hash: "#about-coreValues" },
  { label: "Our Team", hash: "#about-team" },
  { label: "Company Profile", hash: "#about-companyProfile" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const navRef = useRef(null);
  const wrapRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthUser();

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

  useEffect(() => {
    setAboutOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setAboutOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    try {
      const touch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      setIsTouch(Boolean(touch));
    } catch (e) {
      setIsTouch(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/about") return;
    if (!location.hash) return;
    if (!location.hash.startsWith("#about-")) return;

    requestAnimationFrame(() => {
      scrollToHash(location.hash);
    });
  }, [location.pathname, location.hash]);

  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    const navH = navRef.current?.offsetHeight ?? 72;

    const currentY = window.scrollY;
    const targetY = el.getBoundingClientRect().top + window.scrollY;

    const goingDown = targetY > currentY;
    const willHide = goingDown && targetY - currentY > 140;
    const offset = goingDown ? (willHide ? 0 : navH + 16) : navH + 16;

    window.scrollTo({ top: targetY - offset, behavior: "smooth" });
  };

  const goToAboutSection = (hash) => {
    if (location.pathname !== "/about") {
      navigate(`/about${hash}`);
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
          <img src={logo} alt="Cliberduche Logo" className="nav-logo" />
          <span className="brand-text">
            <span className="brand-primary">Cliberduche</span>
            <span className="brand-secondary">Corporation</span>
          </span>
        </NavLink>

        <div className="nav-main">
          <div className="site-links">
            <NavLink
              to="/"
              state={{ fromInternal: true }}
              className="nav-item"
              end
            >
              <span className="nav-item-text">Home</span>
              <span className="nav-item-underline"></span>
            </NavLink>

            <div className="nav-dropdown" ref={wrapRef}>
              <div className="nav-dropdown-trigger">
                <NavLink to="/about" className="nav-item nav-dropdown-link">
                  <span className="nav-item-text">About</span>
                  <span className="nav-item-underline"></span>
                </NavLink>
                <button
                  type="button"
                  className={`nav-dropdown-btn ${aboutOpen ? "is-open" : ""}`}
                  onClick={() => setAboutOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                >
                  <span className="nav-dropdown-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {aboutOpen && (
                <div className="nav-dropdown-menu" role="menu">
                  {ABOUT_MENU.map((item) => (
                    <button
                      key={item.hash}
                      type="button"
                      className="nav-dropdown-item"
                      role="menuitem"
                      onClick={() => goToAboutSection(item.hash)}
                    >
                      <span className="nav-dropdown-item-text">
                        {item.label}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="nav-dropdown-item-icon"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/services" className="nav-item">
              <span className="nav-item-text">Services</span>
              <span className="nav-item-underline"></span>
            </NavLink>

            <NavLink to="/projects" className="nav-item">
              <span className="nav-item-text">Projects</span>
              <span className="nav-item-underline"></span>
            </NavLink>
          </div>
        </div>

        <div className="nav-actions">
          <NavLink to="/contact" className="nav-btn nav-btn-primary">
            Contact Us
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="nav-btn-icon"
            >
              <path
                d="M4 8H12M12 8L8.66667 5M12 8L8.66667 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          {user ? (
            <NavLink
              to={user.is_admin ? "/admin/appointments" : "/dashboard/appointments"}
              className="nav-login"
            >
              <span>Book Appointment</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-login">
              <span>Book Appointment</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
//test