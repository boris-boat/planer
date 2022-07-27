import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const Item = (props) => {
  //single todo item
  const [todo, setTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    setTodo(props.item);
  }, [props.item]);

  return (
    <div className="d-flex flex-row justify-content-between align-items-cente">
      <div>
        <h5
          style={{
            textDecorationLine: props.item.completed ? "line-through" : "",
          }}
          className="mt-1"
          onClick={() => {
            props.completeTodo(todo._id);
          }}
        >
          {todo.text}
        </h5>
      </div>

      <div className="d-flex align-items-end">
        <Button
          style={{
            marginRight: "5px",
            borderRadius: "40px",
            backgroundColor: "#133c55",
          }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <RiEditLine style={{ marginBottom: "5px" }} />
        </Button>
        <Button
          variant="danger"
          style={{ borderRadius: "40px" }}
          onClick={() => {
            props.deleteToDo(todo._id);
          }}
        >
          <RiDeleteBin6Line
            style={{
              height: "20px",
              width: "18px",
              marginBottom: "3px",
            }}
          />
        </Button>
      </div>
      <Modal
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="editTodoModal">
          <Modal.Title id="contained-modal-title-vcenter">
            Enter new text :
          </Modal.Title>
          <input style={{margin: "0 10px",marginBottom : "-2px"}}
            defaultValue={todo.text}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          ></input>
          <Button size="sm"
            onClick={(e) => {
              e.preventDefault();
              props.editTodo(todo._id, updatedTodo);
              setTodo((prev) => ({...prev,text : updatedTodo}))
              setShowModal(false)
            }}
          >
            Save
          </Button>
        </Modal.Header>
      </Modal>
    </div>
  );
};
export default Item;
