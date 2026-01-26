import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

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

  return (
    <nav
      className={`site-nav ${scrolled ? "is-scrolled" : ""} ${
        hidden ? "is-hidden" : ""
      }`}
    >
      <div className="site-nav-inner">
        {/* LEFT */}
        <NavLink to="/" className="site-brand">
          CLIBERDUCHE
        </NavLink>

        {/* CENTER */}
        <div className="site-links">
          {["about", "services", "projects", "safety"].map((item) => (
            <NavLink key={item} to={`/${item}`} className="site-link">
              {item}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <NavLink to="/contact" className="btn btn-filled nav-btn">
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
