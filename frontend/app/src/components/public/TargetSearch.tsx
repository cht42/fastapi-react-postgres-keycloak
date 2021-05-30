import React, { FC, useEffect, useState } from "react";
import {
  Card,
  Container,
  CardColumns,
  Image,
  Row,
  FormGroup,
  Form,
  Col,
  Jumbotron,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { getName, Target } from ".";

const loadAllTargets = async () => {
  return fetch("/api/targets", {
    method: "GET",
  });
};

export const TargetSearch: FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [targetsDefault, setTargetsDefault] = useState<Target[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    document.title = "Home";
    loadAllTargets()
      .then((res) => res.json())
      .then((data) => {
        setTargetsDefault(data);
        setTargets(data);
      })
      .catch(console.error);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchQuery(input);
    setTargets(
      targetsDefault.filter(
        (elem) =>
          elem.first_name.toLowerCase().includes(input.toLowerCase()) ||
          elem.last_name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const listTargets = targets.map((target) => (
    <Card key={target.id} style={{ maxWidth: 345 }}>
      <Link to={"/targets/" + target.id}>
        <Card.Body style={{ textAlign: "center" }}>
          <Image roundedCircle height={50} src="/images/draven.jpeg" />
          <Image roundedCircle height={50} src="/images/ezreal.png" />
          <Image roundedCircle height={50} src="/images/avatar.jpg" />
          <Image roundedCircle height={50} src="/images/lulu.jpeg" />
          <Image roundedCircle height={50} src="/images/teemo.jpeg" />
          <hr />
          <Card.Text>{getName(target)}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  ));

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Search Targets</h1>
            <br />
            <FormGroup>
              <Form.Control
                value={searchQuery}
                onChange={handleChange}
                type="text"
                placeholder="Enter name"
              />
            </FormGroup>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardColumns>{listTargets}</CardColumns>
        </Col>
      </Row>
    </Container>
  );
};
