import react from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Topnavbar = (props) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand role="button" onClick={() => navigate("/home")}>
          imaSve
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item className="m-0 p-0">
            <input
              className="w-100 mt-1"
              onChange={(event) => {
                props.setSearch(event.target.value);
              }}
              placeholder="Search"
            ></input>
          </Nav.Item>

          <NavDropdown title="Info" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => props.setVremeShow(true)}>
              Weather today
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.setNewsShow(true)}>
              News
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link onClick={() => props.logout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Topnavbar;
