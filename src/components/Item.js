import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const Item = (props) => {
  //single todo item
  const [todo, setTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTodo(props.item);
  }, [props.item]);

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center"
      style={{ maxHeight: "45px" }}
    >
      <div style={{ maxWidth: "70%" }}>
        <h5
          style={{
            textDecorationLine: todo.completed ? "line-through" : "",
            wordWrap: "break-word",
          }}
          className="mt-1 mb-1"
          onClick={() => {
            props.completeTodo(todo._id);
          }}
        >
          {todo.text}
        </h5>
      </div>

      <div className="d-flex align-items-end" style={{ marginRight: "-10px" }}>
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
        <Modal.Header
          closeButton
          className="editTodoModal"
          style={{ paddingLeft: "100px" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Enter new text :
          </Modal.Title>
          <input
            style={{ margin: "0 10px", marginBottom: "-2px", width: "300px" }}
            defaultValue={todo.text}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          ></input>
          <Button
            size="sm"
            className="editToDoButton"
            onClick={(e) => {
              e.preventDefault();
              props.editTodo(todo._id, updatedTodo);
              setTodo((prev) => ({ ...prev, text: updatedTodo }));
              setShowModal(false);
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
