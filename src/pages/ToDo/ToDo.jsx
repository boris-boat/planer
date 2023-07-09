/* eslint-disable no-undef */
import { React, useEffect, useState } from "react";
import axios from "axios"
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./ToDo.styles.css";
import Quote from "../../components/Quote";
import { useStateContext } from "../../components/StateContext";
import Item from "../../components/Item";
import CategorySelector from "../../components/CategorySelector";

function ToDo() {
  const { category, newTodo, setnewTodo, fullUserInfo } = useStateContext();

  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();

  // eslint-disable-next-line no-undef
  const { REACT_APP_API_URL } = process.env;
  let user = fullUserInfo.data.username;
  const center = "d-flex justify-content-center align-items-center";

  useEffect(() => {
    //first population of todos
    const getTodos = async () => {
      axios.get(REACT_APP_API_URL + "/todos/" + user)
      .then((res) => setTodos(res.data))
      .catch((e) => console.log("Database error  : " + e));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    getTodos();

  }, []);
  const handleUpdate = async (id, text) => {
    axios.post(REACT_APP_API_URL + "/todos/editTodo/" + id,
    {text: text}
    ).catch((e) => console.log(e));
  };
 
  const addToDo = async () => {
    let newestTodo = axios.post(REACT_APP_API_URL + "/todos/createTodo", {
   
   
        text: newTodo,
        creator: user,
        category: category === "Everything" ? "General" : category,
        completed: false,
    
    })
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
  //sets striketrough for completed todos
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

  //handles sharing with viber
  const handleShare = () => {
    let tempList = [];
    todos.forEach((todo) => {
      if (category === "Everything") {
        tempList.push(todo.text);
      } else if (todo.category === category) tempList.push(todo.text);
    });
    setList(tempList);
  };

  return (
    <div className="todoContainer">
      <>
        <Row
          className="todoListContainer"
          style={{ margin: "0", width: "100%" }}
        >
          <Quote />
          <Container style={{ height: "auto", padding: "0" }}>
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
                  <Button type="submit" variant="primary" id="button-addon2">
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
            <div
              className="d-flex flex-row wrap-nowrap justify-content-between shareContainer"
              style={{ width: "20%" }}
            >
              {" "}
              <div className="mb-3" style={{ color: "white" }}>
                Category : {category}
              </div>
              <a
                style={{ marginLeft: "10px", padding: "0" }}
                onClick={() => {
                  handleShare();
                }}
                href={`viber://forward?text=${list}`}
              >
                <img
                  style={{ width: "100px" }}
                  src={require("../../components/media/Icons/shareviber.png")}
                  alt=""
                ></img>
              </a>
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
                  <img
                    className="loadingGif"
                    src={require("../../components/media/loading.gif")}
                    alt=""
                  ></img>
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
                              editTodo={handleUpdate}
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
                              editTodo={handleUpdate}
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
