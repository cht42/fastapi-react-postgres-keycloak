import "react-notifications/lib/notifications.css";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Jumbotron,
  Row,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Auth } from "./utils/Auth";
import { Notifier } from "./utils/Notifier";
import { Ping } from "./utils/Ping";
import styled from "styled-components";

const Styles = styled.div`
  .padding-top {
    padding-top: 16px;
  }

  .center {
    width: fit-content;
    text-align: center;
    margin: 1em auto;
    display: table;
  }

  .main-search-bar {
    padding: 32px;
    margin-top: 32px;
    margin-bottom: 8px;
  }
`;

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const auth = new Auth();

  useEffect(() => {
    document.title = "Login - My Project";
  }, []);

  const onFormSubmitted = async (event) => {
    if (username.length && password.length) {
      const api_ping_query = await Ping.pingApi();
      if (api_ping_query) {
        const api_auth_query = await auth.requestLDAPLogin(username, password);
        if (api_auth_query && api_auth_query.error === false) {
          auth.registerUserAuthentication(api_auth_query);
        } else {
          Notifier.notifyFromResponse(api_auth_query, "Authentication");
        }
      } else {
        Notifier.createNotification(
          "error",
          "API unreachable",
          "Please check your internet connection"
        );
      }
    }
  };

  return (
    <Styles>
      <Container>
        <Row className="padding-top">
          <Col lg={{ offset: 3, span: 6 }}>
            <Card>
              <Card.Body>
                <Jumbotron>
                  <h1>Login</h1>
                  <p>
                    Login to the application with your Keycloak credentials to
                    access your dashboard.
                  </p>
                </Jumbotron>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={onFormSubmitted}
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};
