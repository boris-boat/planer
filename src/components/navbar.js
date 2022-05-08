import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
const Topnavbar = (props) => {
  const navigate = useNavigate();
  const { setVremeShow, setSearch, setNewsShow } = useStateContext();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand role="button" onClick={() => navigate("/home")}>
          imaSve
        </Navbar.Brand>

        <Nav className="me-auto">
          {window.location.pathname !== "/tracker" ? (
            <Nav.Item className="mt-1">
              <input
                style={{ width: "100px" }}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                placeholder="Search"
              ></input>
            </Nav.Item>
          ) : (
            ""
          )}

          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => setVremeShow(true)}>
              Weather today
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setNewsShow(true)}>
              News
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/tracker")}>
              Expense tracker
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Topnavbar;
