import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBs from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <NavbarBs bg="light" expand="lg" className="border-bottom">
      <Container>
        <NavbarBs.Brand as={NavLink} to="/" className="fw-bold">
          THE COMPANY
        </NavbarBs.Brand>

        <NavbarBs.Toggle aria-controls="main-nav" />
        <NavbarBs.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/about" end>
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/services">
              Services
            </Nav.Link>

            <Nav.Link as={NavLink} to="/projects">
              Projects
            </Nav.Link>

            <Nav.Link as={NavLink} to="/safety">
              Safety
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
}