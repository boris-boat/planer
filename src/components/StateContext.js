import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();
export const StateContext = ({ children }) => {
  const user = localStorage.getItem("user");
  const { REACT_APP_API_URL } = process.env;
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);
  const [newsShow, setNewsShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");
  const [news, setNews] = useState([]);
  const [data, setData] = useState();

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
  const getTrackerInfo = async () => {
    fetch("http://localhost:3001/trackerData" + user)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((e) => console.log("Database error  : " + e));
  };

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
  const getTodos = async () => {
    fetch(REACT_APP_API_URL + "/todos" + user)
      .then((res) => res.json())
      .then((result) => setTodos(result))
      .catch((e) => console.log("Database error  : " + e));
  };

  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        VremeShow,
        setVremeShow,
        newsShow,
        setNewsShow,
        todos,
        setTodos,
        news,
        setNews,
        search,
        setSearch,
        newTodo,
        setnewTodo,
        creator,
        setCreator,
        addToDo,
        deleteToDo,
        completeTodo,
        user,
        data,
        getTrackerInfo,
        getTodos,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
