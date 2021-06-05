import React, { FC } from "react";

import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/Auth";

export const Home: FC = () => {
  document.title = "Targets";

  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h1>Hello</h1>
          <p>You are on the homepage of your project. Present it here !</p>
          {isAuthenticated() ? (
            <Link to="/targets">
              <Button>Targets search</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};
