import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Row,
  Col,
  Container,
  ListGroup,
  DropdownButton,
  Dropdown,
  Jumbotron,
} from "react-bootstrap";

import { Target } from ".";
import { authorized_fetch } from "../../utils/Auth";

export const TargetInfo: FC = () => {
  const { id }: { id: string } = useParams();
  const [target, setTarget] = useState<Target | null>(null);
  const history = useHistory();

  useEffect(() => {
    document.title = "Target Information";
    authorized_fetch(
      "/api/targets/" + id,
      {},
      {
        method: "GET",
      }
    )
      .then((data) => setTarget(data))
      .catch(console.error);
  }, [id]);

  const deleteTarget = async (e: React.MouseEvent) => {
    if (window.confirm("Are you sure you want to delete this target ?")) {
      await authorized_fetch("/api/targets/" + id, {}, { method: "DELETE" });
      history.push("/");
    }
  };

  const listPaths = target && (
    <ListGroup>
      {target.pictures.map((picture, idx) => (
        <ListGroup.Item key={idx}>{picture.path}</ListGroup.Item>
      ))}
    </ListGroup>
  );
  const listAttributes = target && (
    <ListGroup>
      {Object.entries(target)
        .filter(([key, value]) => key !== "pictures")
        .map(([key, value], idx) => (
          <ListGroup.Item key={idx}>
            <b>{key}</b> {value}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );

  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Jumbotron>
            <h1>Target File</h1>
            <br />
            <DropdownButton title="Options">
              <Dropdown.Item onClick={deleteTarget}>
                Delete Target
              </Dropdown.Item>
            </DropdownButton>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h1>Target Attributes</h1>
          {listAttributes}
        </Col>
        <Col xs={6}>
          <h1>Target Pictures</h1>
          {listPaths}
        </Col>
      </Row>
    </Container>
  );
};
