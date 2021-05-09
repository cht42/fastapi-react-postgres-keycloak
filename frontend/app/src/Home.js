import { Button, Col, Container, Jumbotron, Nav, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  .padding-bottom {
    padding-bottom: 16px;
  }

  .center {
    width: fit-content;
    text-align: center;
    margin: 1em auto;
    display: table;
  }
`;

export const Home = () => {
  useEffect(() => {
    document.title = "Home - My Project";
  }, []);

  return (
    <Styles>
      <Container>
        <Row className="padding-bottom">
          <Col lg={{ span: 12 }} className="center">
            <Jumbotron>
              <h1>Hello</h1>
              <p>You are on the homepage of your project. Present it here !</p>
              <p>
                <Nav.Link as={Link} to={"/login"}>
                  <Button variant="warning">Login !</Button>
                </Nav.Link>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default Home;
