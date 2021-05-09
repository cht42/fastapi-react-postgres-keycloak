import { Alert, Col, Container, Jumbotron, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import { Auth } from "./utils/Auth";
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

export const Dashboard = () => {
  const auth = new Auth();
  const profile = { first_name: "cyprien", username: "chuet" }; //auth.getUserProfile();

  useEffect(() => {
    document.title = "Dashboard - My Project";
  }, []);

  return (
    <Styles>
      <Container>
        <Row className="padding-bottom">
          <Col lg={{ span: 12 }} className="center">
            <Jumbotron>
              <h1>Hello {profile.first_name} !</h1>
              <p>You are on your dashboard page.</p>
              <Alert variant={"dark"}>
                You are logged in as <b>{profile.username}</b>
              </Alert>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default Dashboard;
