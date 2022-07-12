import React, { useState } from "react";
import { Nav, Navbar, Container, Offcanvas, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import MenuIcon from "@mui/icons-material/Menu";
import "../App.css";
import Vreme from "./vreme";


const Topnavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { setVremeShow, VremeShow } = useStateContext();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  let user = localStorage.getItem("user")?.split(" ")[0];
  const handleClose = () => setShow(false);

  return (
    <>
      {user ? (
        <Navbar bg="primary" variant="dark" fixed="top">
          <Container>
            <Nav.Item>
              <MenuIcon
                style={{ color: "white",cursor: "pointer" }} 
                onClick={() => setShow(true)}
              />
            </Nav.Item>
            <Navbar.Brand
              role="button"
             
              onClick={() => navigate("/home")}
              className="siteName"
            >
              <h3 style={{ margin: "0" }} >imaSve</h3>
            </Navbar.Brand>
            <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" variant="primary" >
        <img src={require("./media/Icons/account2.png")} alt="" className="accImg"></img>
      </Dropdown.Toggle>

      <Dropdown.Menu align={{ sm: 'start' }}>
        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
            
          </Container>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/todo");
                    setShow(false);
                  }}
                >
                  To Do/Reminders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/join");
                    setShow(false);
                  }}
                >
                  Chat
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                 onClick={() => {
                  setVremeShow(true)
                  setShow(false)}
                }
                >
                  Weather
                </Nav.Link>
              </Nav.Item>
              
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/torrent");
                    setShow(false);
                  }}
                >
                  Torrent Tracker
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/news");
                    setShow(false);
                  }}
                >
                  Daily news
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/tracker");
                    setShow(false);
                  }}
                >
                  Expense Tracker
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/cookbook");
                    setShow(false);
                  }}
                >
                  Kitchen Assistant
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    navigate("/quiz");
                    setShow(false);
                  }}
                >
                  Quiz
                </Nav.Link>
              </Nav.Item>
            </Offcanvas.Body>
          </Offcanvas>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
        </Navbar>
      ) : null}
    </>
  );
};
export default Topnavbar;
