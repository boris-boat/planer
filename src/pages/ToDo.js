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
    const getTodos = async () => {
      fetch(REACT_APP_API_URL + "/todos/" + user)
        .then((res) => res.json())
        .then((result) => setTodos(result))
        .catch((e) => console.log("Database error  : " + e));
    };
    getTodos();
  });
  const {
    category,

    VremeShow,
    setVremeShow,
    setSearchBar,
    search,
    newTodo,
    setnewTodo,
    notify,
  } = useStateContext();
  setSearchBar(true);

  return (
    <div className="App">
      {user ? (
        <>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />

          <Quote />

          <Container>
            <h1 className="mt-3">Welcome {user} !</h1>

            <Row className="d-inline-flex mt-3">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();

                  addToDo();
                  setnewTodo("");
                }}
              >
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
                    type="submit"
                    variant="outline-secondary"
                    id="button-addon2"
                  >
                    Add
                  </Button>
                </InputGroup>
              </Form>
            </Row>
          </Container>

          <Row
            style={{ width: "400px", marginLeft: "0" }}
            className="d-flex justify-content-center align-items-center"
          >
            <CategorySelector />
          </Row>
          <div className="mb-3">{category}</div>

          <ListGroup>
            <div className="cela-grupa">
              {todos.length !== 0 ? (
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
