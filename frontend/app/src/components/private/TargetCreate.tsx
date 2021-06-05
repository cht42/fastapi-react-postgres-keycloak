import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { authorized_fetch } from "../../utils/Auth";

export const TargetCreate = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    document.title = "Create Target";
    if (firstName.length > 0 && lastName.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName]);

  const createTarget = async (e: React.MouseEvent) => {
    const data = await authorized_fetch(
      "/api/targets",
      { "content-type": "application/json" },
      {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          dob: dob,
        }),
      }
    );
    history.push("/targets/" + data.id);
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
