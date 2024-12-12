import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import '../styles/Nav.css'
const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="navv">
      <Container>
        {/* Left Side - Company Name */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="navbar-title"  // Apply the custom class
        >
          WordVoyage
        </Navbar.Brand>

        {/* Toggler for responsive behavior */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Center and Right sections */}
        <Navbar.Collapse id="navbar-nav">
          {/* Center - Menu Items */}
          <Nav className="mx-auto fw-semibold nav-items nav-subitems"> {/* Apply custom class */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Blog" id="blog-dropdown">
              <NavDropdown.Item as={Link} to="/category1" eventKey="4.1">Category 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category2" eventKey="4.2">Category 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category3" eventKey="4.3">Category 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/category4" eventKey="4.4">Category 4</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right - Login and Signup */}
          <Nav className="fw-semibold nav-items"> {/* Apply custom class */}
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link 
  as={Link} 
  to="/signup" 
  className="btn btn-primary signup-link px-3 ml-2"
>
  Sign Up
</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
