import "../index.css";
import { React, useState, useEffect } from "react";

const { REACT_APP_API_URL } = process.env;
const Input = () => {
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
      }),
    })
      .then((res) => {
        res.json();
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div key="input" className="mt-5">
        <h1>Welcome {creator}</h1>
        <div className="input-group mb-3  mt-5">
          <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={(e) => setnewTodo(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => {
              addToDo();
              setnewTodo("");
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
};
export default Input;
