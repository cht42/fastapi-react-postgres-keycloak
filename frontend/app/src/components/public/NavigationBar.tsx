import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Navbar>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/targets">
            Target Search
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/targets/create">
            Target Create
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
