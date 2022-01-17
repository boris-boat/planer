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
  Row,
  Dropdown,
  InputGroup,
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
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

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
                <Nav.Item className="m-0 p-0">
                  <input
                    className="w-100 mt-1"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    placeholder="Search"
                  ></input>
                </Nav.Item>

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

          <Input category={category} />
          <Row>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {category}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCategory("General")}>
                  General
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCategory("Reminders")}>
                  Reminders
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCategory("Shoping List")}>
                  Shoping List
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <ListGroup>
            <div className="cela-grupa" key="svezajedno">
              {todos ? (
                todos
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.text.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((todo) => {
                    if (todo.category === category) {
                      return (
                        <ListGroup.Item key={todo._id}>
                          <div className="d-flex flex-row justify-content-between align-items-cente r">
                            <div>
                              <h5 className="mt-1">{todo.text}</h5>
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
                      );
                    }
                  })
              ) : (
                <h1>Nothing here , go add some items !</h1>
              )}
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
