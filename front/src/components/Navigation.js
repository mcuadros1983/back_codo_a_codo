import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            Administracion de Productos
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/products/new" className="nav-link">
              Crear producto
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}