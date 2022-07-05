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

import Quote from "../components/Quote";
import Vreme from "../components/vreme";
import { useStateContext } from "../components/StateContext";
import Item from "../components/Item";
import CategorySelector from "../components/CategorySelector";

function ToDo() {
  let user = localStorage?.getItem("user")?.split(" ")[0];
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const getTodos = async () => {
      fetch(REACT_APP_API_URL + "/todos/" + user)
        .then((res) => res.json())
        .then((result) => setTodos(result))
        .catch((e) => console.log("Database error  : " + e));
      setLoading(false);
    };
    getTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    category,

    VremeShow,
    setVremeShow,

    newTodo,
    setnewTodo,
  } = useStateContext();
  const center = "d-flex justify-content-center align-items-center";
  return (
    <div className="todoContainer">
      <>
        <Row className="todoListContainer" style={{ margin: "0" }}>
          <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
          <Quote />
          <Container style={{ height: "auto", padding: "0" }}>
            <h1 className="mt-3" style={{ color: "white" }}>
              Welcome {user} !
            </h1>

            <Row className="d-inline-flex mt-3">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setnewTodo("");
                  addToDo();
                }}
              >
                <InputGroup className="mb-3 flex-wrap-nowrap">
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

          <Container
            className={`${center} flex-column`}
            style={{ padding: "0" }}
          >
            <Row style={{ width: "100vw", margin: "0" }} className={center}>
              <CategorySelector style={{ width: "100%" }} />
            </Row>
            <div className="mb-3" style={{ color: "white" }}>
              Category : {category}
            </div>

            <ListGroup
              className={`${center} listGrupaToDo`}
              style={{ textAlign: "start", width: "50%" }}
            >
              {" "}
              {todos.length !== 0 && (
                <div
                  style={{ width: "70%" }}
                  className="d-flex justify-content-center"
                >
                  {" "}
                  <input
                    style={{ width: "60%", marginBottom: "10px" }}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    placeholder="Search ToDos"
                  ></input>
                </div>
              )}
              <div className="cela-grupa" style={{ borderRadius: "10px" }}>
                {loading ? (
                  <Spinner
                    style={{ display: "flex", alignContent: "center" }}
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : todos.length !== 0 ? (
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
                  <div
                    style={{
                      width: "auto",
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  >
                    <h3 style={{ color: "white" }}>Please add some todos!</h3>
                  </div>
                )}
              </div>
            </ListGroup>
          </Container>
        </Row>
      </>
    </div>
  );
}

export default ToDo;
