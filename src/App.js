import "./App.css";
import "./index.css";

import Item from "./components/Item";
import { Suspense } from "react";
import { ListGroup, Button, Container, Row, InputGroup } from "react-bootstrap";

import { useState, useEffect } from "react";
import Vreme from "./components/vreme";
import Quote from "./components/quote";
import News from "./components/news";

import { useNavigate } from "react-router-dom";
import Topnavbar from "./components/navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [VremeShow, setVremeShow] = useState(false);
  const [newsShow, setNewsShow] = useState(false);
  const [news, setNews] = useState([]);

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
  useEffect(() => {
    getTodos();
  }, []);
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

  const deleteToDo = async (id) => {
    await fetch(REACT_APP_API_URL + "/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));

    const todosCopy = todos;

    setTodos(todosCopy.filter((todo) => todo._id !== id));
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
      <Topnavbar
        setSearch={setSearch}
        setVremeShow={setVremeShow}
        logout={logout}
        setNewsShow={setNewsShow}
      />

      {user ? (
        <>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
          <News show={newsShow} onHide={() => setNewsShow(false)} news={news} />
          <Suspense fallback={<h1>Loading quote...</h1>}>
            <Quote />
          </Suspense>

          <Container className="">
            <Suspense fallback={<h1>Loading user...</h1>}>
              {" "}
              <h1 className="mt-3">Welcome {creator} !</h1>
            </Suspense>

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
            <Suspense fallback={<h1>Loading items...</h1>}>
              <div className="cela-grupa" key={Math.random() * 1000}>
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
            </Suspense>
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
