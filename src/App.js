import "./App.css";
import "./index.css";

import Item from "./components/Item";
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

import { useNavigate } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [VremeShow, setVremeShow] = useState(false);

  const user = localStorage.getItem("user");
  const [category, setCategory] = useState("Everything");
  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setCreator(localStorage.getItem("user"));
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
    });
  }, []);
  const { REACT_APP_API_URL } = process.env;
  const getTodos = async () => {
    fetch(REACT_APP_API_URL + "/todos" + user)
      .then((res) => res.json())
      .then((result) => setTodos(result))
      .catch((e) => console.log("Database error  : " + e));
  };

  const addToDo = async () => {
    let newestTodo = await fetch(REACT_APP_API_URL + "/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        creator: creator,
        category: category === "Everything" ? "General" : category,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    setTodos([...todos, newestTodo]);
  };
  useEffect(() => {
    getTodos();
  }, []);

  const deleteToDo = async (id) => {
    await fetch(REACT_APP_API_URL + "/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));

    //findbyid and assign to value then filter by it
    const todosCopy = todos;

    todosCopy.filter((todo) => todo._id !== id);
    console.log(todosCopy);
    setTodos([todosCopy]);
  };
  const completeTodo = async (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo._id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );
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
                </NavDropdown>

                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />

          {/* <Input category={category} /> */}
          <Container className="">
            <h1 className="mt-3">Welcome {creator}</h1>

            <Row className="d-inline-flex mt-3">
              <InputGroup
                className="mb-3"
                onChange={(e) => setnewTodo(e.target.value)}
                value={newTodo}
              >
                <input
                  className="input-field"
                  placeholder="Add new item"
                  value={newTodo}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => {
                    addToDo();
                    setnewTodo("");
                  }}
                >
                  Add
                </Button>
              </InputGroup>
            </Row>
          </Container>
          <Row>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {category}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCategory("Everything")}>
                  Everything
                </Dropdown.Item>
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
            <div className="cela-grupa" key={Math.random()}>
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
                        <ListGroup.Item>
                          <Item
                            key={todo._id}
                            item={todo}
                            completeTodo={completeTodo}
                            deleteToDo={deleteToDo}
                          />
                        </ListGroup.Item>
                      );
                    } else if (category === "Everything") {
                      return (
                        <ListGroup.Item>
                          <Item
                            key={todo._id}
                            item={todo}
                            completeTodo={completeTodo}
                            deleteToDo={deleteToDo}
                          />
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
