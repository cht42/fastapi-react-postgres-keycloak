import React, { FC } from "react";

import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h1>Hello</h1>
          <p>You are on the homepage of your project. Present it here !</p>
          <Link to="/targets">
            <Button>Targets search</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
