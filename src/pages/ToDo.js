import { React, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Quote from "../components/quote";
import Vreme from "../components/vreme";
import { useStateContext } from "../components/StateContext";
import Item from "../components/Item";
import CategorySelector from "../components/CategorySelector";

function ToDo() {
  let user = localStorage.getItem("user").split(" ")[0];

  const [todos, setTodos] = useState([]);
  const { REACT_APP_API_URL } = process.env;

  const addToDo = async () => {
    let newestTodo = await fetch(REACT_APP_API_URL + "/todos/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        creator: user,
        category: category === "Everything" ? "General" : category,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    setTodos([...todos, newestTodo]);
  };
  const deleteToDo = async (id) => {
    await fetch(REACT_APP_API_URL + "/todos/delete" + id, {
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

  const navigate = useNavigate();
  useEffect(() => {
    setSearchBar(true);
    const getTodos = async () => {
      fetch(REACT_APP_API_URL + "/todos/" + user)
        .then((res) => res.json())
        .then((result) => setTodos(result))
        .catch((e) => console.log("Database error  : " + e));
    };
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    category,

    VremeShow,
    setVremeShow,
    setSearchBar,
    search,
    newTodo,
    setnewTodo,
  } = useStateContext();

  return (
    <div className="todoContainer">
      {user ? (
        <>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />

          <Quote />

          <Container style={{ height: "auto" }}>
            <h1 className="mt-3" style={{ color: "white" }}>
              Welcome {user} !
            </h1>

            <Row className="d-inline-flex mt-3">
              <Form
                onSubmit={(e) => {
                  console.log("submit");
                  e.preventDefault();
                  setnewTodo("");
                  addToDo();
                  console.log(newTodo);
                }}
              >
                <InputGroup className="mb-3">
                  <input
                    className="input-field"
                    placeholder="Add new item"
                    value={newTodo}
                    onChange={(e) => setnewTodo(e.target.value)}
                  />
                  <Button type="submit" variant="info" id="button-addon2">
                    Add
                  </Button>
                </InputGroup>
              </Form>
            </Row>
          </Container>
          <Container className="d-flex justify-content-center align-items-center flex-column">
            <Row
              style={{ width: "400px", marginLeft: "0" }}
              className="d-flex justify-content-center align-items-center"
            >
              <CategorySelector />
            </Row>
            <div className="mb-3" style={{ color: "white" }}>
              {category}
            </div>

            <ListGroup>
              <div className="cela-grupa" style={{ borderRadius: "10px" }}>
                {todos.length !== 0 ? (
                  todos
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.text.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      } else {
                        return null;
                      }
                    })
                    .map((todo) => {
                      if (todo.category === category) {
                        return (
                          <ListGroup.Item key={todo._id}>
                            <Item
                              item={todo}
                              completeTodo={completeTodo}
                              deleteToDo={deleteToDo}
                            />
                          </ListGroup.Item>
                        );
                      } else if (category === "Everything") {
                        return (
                          <ListGroup.Item key={todo._id}>
                            <Item
                              item={todo}
                              completeTodo={completeTodo}
                              deleteToDo={deleteToDo}
                            />
                          </ListGroup.Item>
                        );
                      } else {
                        return null;
                      }
                    })
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </div>
            </ListGroup>
          </Container>
        </>
      ) : (
        <div className="App">
          <h1 className="mt-5">Please create an account or login !</h1>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default ToDo;
