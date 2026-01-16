import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="border-top py-3 mt-4">
      <Container className="text-center">
        <small className="text-muted">
          © {new Date().getFullYear()} Company Portfolio
        </small>
      </Container>
    </footer>
  );
}
