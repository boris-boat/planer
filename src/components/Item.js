import React from "react";
import { useState, useEffect } from "react";

const Item = (props) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    setTodo(props.item);
  }, [props.item]);

  return (
    <div className="d-flex flex-row justify-content-between align-items-cente" >
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
        <button
          className="btn-danger btn-sm d-flex "
          onClick={() => {
            props.deleteToDo(todo._id);
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};
export default Item;
