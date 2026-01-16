import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBs from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "fw-semibold" : ""}`;

  return (
    <NavbarBs bg="light" expand="lg" className="border-bottom">
      <Container>
        <NavbarBs.Brand as={NavLink} to="/">
          Company Portfolio
        </NavbarBs.Brand>

        <NavbarBs.Toggle aria-controls="main-nav" />
        <NavbarBs.Collapse id="main-nav">
          <Nav className="ms-auto">
            <NavLink className={linkClass} to="/about">
              About
            </NavLink>
            <NavLink className={linkClass} to="/projects">
              Projects
            </NavLink>
            <NavLink className={linkClass} to="/skills">
              Skills
            </NavLink>
            <NavLink className={linkClass} to="/experience">
              Experience
            </NavLink>
            <NavLink className={linkClass} to="/contact">
              Contact
            </NavLink>
          </Nav>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
}
