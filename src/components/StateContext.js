import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);

  const [searchBar, setSearchBar] = useState(true);
  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");
  const [testToken, setTestToken] = useState("");
  const [validated, setValidated] = useState(false);
  let user = localStorage.getItem("user")?.split(" ")[0];
  const validate = async () => {
    const createTokenTest = async () => {
      let value = await fetch("http://localhost:3001/").then((response) =>
        response.json()
      );
      return value;
    };
    let token = localStorage.getItem("token");
    let tokenTest = await createTokenTest();

    setValidated(
      localStorage.getItem("user") &&
        tokenTest === token &&
        localStorage.getItem("user") === user + " " + token
    );
  };
  validate();

  return (
    <Context.Provider
      value={{
        validate,
        validated,
        setValidated,
        searchBar,
        setSearchBar,
        category,
        setCategory,
        VremeShow,
        setVremeShow,
        setTestToken,
        testToken,
        search,
        setSearch,
        newTodo,
        setnewTodo,
        creator,
        setCreator,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
