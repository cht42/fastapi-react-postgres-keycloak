import { Nav, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

  .brand-image {
    max-width: 64px;
    height: 30px;
    padding-right: 16px;
  }
`;

export const NavigationBar = ({ onAuthUpdate }) => {
  return (
    <Styles>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={"/"}>
          {"My Project"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={"/login"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={"/about"}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};
