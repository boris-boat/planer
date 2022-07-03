import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import Vreme from "./vreme";
const Topnavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { setVremeShow, setSearch, VremeShow, searchBar } = useStateContext();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigate("/");
  };
  let user = localStorage.getItem("user")?.split(" ")[0];
  const handleClose = () => setShow(false);

  return (
    <>
      {user  ? (
        <Navbar bg="primary" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand role="button" onClick={() => navigate("/home")}  style={{marginLeft : "-7px"}}>
              imaSve
            </Navbar.Brand>
            <Nav className="me-auto">
              {searchBar === true ? (
                <Nav.Item className="mt-1" >
                  <input
                    style={{ width: "85px",marginLeft : "-10px" }}
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
                <NavDropdown.Item onClick={() => setShow(true)}>
                  ToDo/Reminder lists
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleClose()}>
                  Cookbook
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
                <NavDropdown.Item onClick={() =>  navigate("/torrent")}>
                  Torrent tracker
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() =>  navigate("/quiz")}>
                  Quiz
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => navigate("/join")}>Chat</Nav.Link>
              <NavDropdown title="My account" id="basic-nav-dropdown">
              <NavDropdown.Item  disabled>
                 {user}
                </NavDropdown.Item>
              <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
             
            </Nav>
          </Container>
          
          <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
        </Navbar>
      ) : null}
    </>
  );
};
export default Topnavbar;
