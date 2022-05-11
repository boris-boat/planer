import "./App.css";
import "./index.css";
import Item from "./components/Item";

import {
  ListGroup,
  Button,
  Container,
  Row,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Vreme from "./components/vreme";
import Quote from "./components/quote";

import { useNavigate } from "react-router-dom";
import Topnavbar from "./components/navbar";
import { useStateContext } from "./components/StateContext";

function App() {
  let user = localStorage.getItem("user");
  const startingApp = async () => {
    getTodos().then(() => getTrackerInfo());
  };
  const {
    category,
    setCategory,
    VremeShow,
    setVremeShow,

    todos,

    search,
    newTodo,
    setnewTodo,
    creator,
    addToDo,
    deleteToDo,
    completeTodo,
    getTrackerInfo,
    getTodos,
  } = useStateContext();

  const navigate = useNavigate();
  useEffect(() => {
    startingApp();
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
    });
  }, []);

  return (
    <div className="App">
      <Topnavbar />

      {user ? (
        <>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />

          <Quote />

          <Container className="">
            <h1 className="mt-3">Welcome {creator} !</h1>

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

export default App;
