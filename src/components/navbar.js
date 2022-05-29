import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import Vreme from "./vreme";
const Topnavbar = () => {
  const navigate = useNavigate();
  const { setVremeShow, setSearch, VremeShow, searchBar,validated } = useStateContext();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigate("/");
  };
  let user = localStorage.getItem("user")?.split(" ")[0];
  

  return (
    <>
      {user  ? (
        <Navbar bg="primary" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand role="button" onClick={() => navigate("/home")}>
              imaSve
            </Navbar.Brand>
            <Nav className="me-auto">
              {searchBar === true ? (
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
                <NavDropdown.Item onClick={() => navigate("/toDo")}>
                  ToDo/Reminder lists
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => navigate("/news")}>
                  News
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/tracker")}>
                  Expense tracker
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setVremeShow(true)}>
                  Weather today
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
          </Container>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
        </Navbar>
      ) : null}
    </>
  );
};
export default Topnavbar;
