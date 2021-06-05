import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Jumbotron,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router";

import { AuthContext } from "../../App";
import { getTokens } from "../../utils/Auth";

export const Login = (props: any) => {
  const from = props.location.state?.from.pathname;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    document.title = "Login";
    if (username.length > 0 && password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await getTokens(username, password);
      setAuthenticated(true);
      history.push(from ?? "/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Login</h1>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <Alert variant="warning">{error}</Alert>}
              <Button disabled={disabled} onClick={handleClick} type="submit">
                Login
              </Button>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};
