import "./App.css";
import "./index.css";
import Input from "./components/input.js";
import {
  ListGroup,
  Button,
  Nav,
  Navbar,
  Container,
  NavDropdown,
} from "react-bootstrap";

import { useState, useEffect } from "react";
import Vreme from "./components/vreme";
import TomorrowVreme from "./components/vreme sutra";

import { useNavigate } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [VremeShow, setVremeShow] = useState(false);
  const [TomorrowVremeShow, setTomorrowVremeShow] = useState(false);
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
    });
  }, []);

  useEffect(() => {
    const { REACT_APP_API_URL } = process.env;
    const getTodos = async () => {
      const user = localStorage.getItem("user");
      fetch(REACT_APP_API_URL + "/todos" + user)
        .then((res) => res.json())
        .then((result) => setTodos(result))
        .catch((e) => console.log("Database error  : " + e));
    };

    getTodos();
  }, [<Input />]);

  const { REACT_APP_API_URL } = process.env;

  const deleteToDo = async (id) => {
    const focusedToDo = await fetch(REACT_APP_API_URL + "/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos((todos) => todos.filter((todo) => todo._id !== focusedToDo._id));
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Navbar bg="primary" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand role="button" onClick={() => navigate("/home")}>
                imaSve
              </Navbar.Brand>
              <Nav className="me-auto">
                <NavDropdown title="Weather" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setVremeShow(true)}>
                    Weather today
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item onClick={() => setTomorrowVremeShow(true)}>
                    Weather tomorrow
                  </NavDropdown.Item> */}
                </NavDropdown>

                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
          <TomorrowVreme
            show={TomorrowVremeShow}
            onHide={() => setTomorrowVremeShow(false)}
          />

          <Input />
          <ListGroup>
            <div className="cela-grupa" key="svezajedno">
              {todos
                ? todos.map((todo) => (
                    <ListGroup.Item key={todo._id}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>
                          <h5>{todo.text} </h5>
                        </div>
                        <div className="d-flex align-items-end">
                          <button
                            className="btn-danger btn-sm d-flex "
                            onClick={() => {
                              deleteToDo(todo._id);
                            }}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                : ""}
            </div>
          </ListGroup>
        </>
      ) : (
        <>
          <h1>Please create an account or login !</h1>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
