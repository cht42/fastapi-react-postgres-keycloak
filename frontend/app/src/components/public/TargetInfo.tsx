import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

import { Target } from ".";

const loadTarget = async (id: string) => {
  return fetch("/api/targets/" + id, {
    method: "GET",
  });
};

export const TargetInfo: FC = () => {
  const { id }: { id: string } = useParams();
  const [target, setTarget] = useState<Target | null>(null);

  useEffect(() => {
    loadTarget(id)
      .then((res) => res.json())
      .then((data) => setTarget(data))
      .catch(console.error);
  }, [id]);

  const listPaths = target && (
    <ListGroup>
      {target.pictures.map((picture) => (
        <ListGroup.Item>{picture.path}</ListGroup.Item>
      ))}
    </ListGroup>
  );
  const listAttributes = target && (
    <ListGroup>
      {Object.entries(target)
        .filter(([key, value]) => key !== "pictures")
        .map(([key, value]) => (
          <ListGroup.Item>
            <b>{key}</b> {value}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <h1>Target Atrtibutes</h1>
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
