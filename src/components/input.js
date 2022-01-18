import "../index.css";
import { React, useState, useEffect } from "react";
import { Row, Container, InputGroup, Button } from "react-bootstrap";

const { REACT_APP_API_URL } = process.env;
const Input = (props) => {
  useEffect(() => {
    setCreator(localStorage.getItem("user"));
  }, []);
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");

  //da posalje createdBy u bazu
  const API_LOKACIJA = REACT_APP_API_URL;
  const addToDo = async () => {
    await fetch(API_LOKACIJA + "/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        creator: creator,
        category: props.category === "Everything" ? "General" : props.category,
      }),
    })
      .then((res) => {
        res.json();
      })
      .catch((e) => console.log(e));
  };
  return (
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
  );
};
export default Input;
