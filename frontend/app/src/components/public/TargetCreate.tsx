import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";

export const TargetCreate = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    if (firstName.length > 0 && lastName.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName]);

  const createTarget = (e: React.MouseEvent) => {
    fetch("/api/targets", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        dob: dob,
      }),
    })
      .then((res) => res.json())
      .then((data) => history.push("/targets/" + data.id))
      .catch(console.error);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Button disabled={disabled} onClick={createTarget}>
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
