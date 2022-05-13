import { React, useEffect } from "react";
import {
  Button,
  Container,
  InputGroup,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Topnavbar from "./navbar";
import Quote from "./quote";
import Vreme from "./vreme";
import { useStateContext } from "./StateContext";
import Item from "./Item";
let user;
function ToDo() {
  const startingApp = async () => {
    user = localStorage.getItem("user");
    getTodos();
  };

  const navigate = useNavigate();
  useEffect(() => {
    startingApp();

    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
    });
  }, []);
  const {
    category,
    setCategory,
    VremeShow,
    setVremeShow,
    todos,
    search,
    newTodo,
    setnewTodo,

    addToDo,
    deleteToDo,
    completeTodo,

    getTodos,
  } = useStateContext();

  return (
    <div className="App">
      <Topnavbar />

      {user ? (
        <>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />

          <Quote />

          <Container className="">
            <h1 className="mt-3">Welcome {user} !</h1>

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
            <Container className="button-container mb-3">
              <Button
                className="btn-sm"
                variant="success"
                onClick={() => setCategory("General")}
              >
                General
              </Button>{" "}
              <Button
                className="btn-sm"
                variant="success"
                onClick={() => setCategory("Reminders")}
              >
                Reminders
              </Button>{" "}
              <Button
                className="btn-sm"
                variant="success"
                onClick={() => setCategory("Shoping List")}
              >
                Shoping List
              </Button>{" "}
              <Button
                className="btn-sm"
                class="btn-l"
                variant="success"
                onClick={() => setCategory("Everything")}
              >
                Everything
              </Button>{" "}
            </Container>
          </Row>
          <div className="mb-3">{category}</div>

          <ListGroup>
            <div className="cela-grupa">
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
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
          </ListGroup>
        </>
      ) : (
        <>
          <h1 className="mt-5">Please create an account or login !</h1>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back
          </Button>
        </>
      )}
    </div>
  );
}

export default ToDo;
