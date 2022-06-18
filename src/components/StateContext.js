import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);
  const [torrentCategory, setTorrentCategory] = useState("All");
  const [searchBar, setSearchBar] = useState(true);
  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState(null);
  const [creator, setCreator] = useState("");
  const [testToken, setTestToken] = useState("");
  const [validated, setValidated] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState(10);
  const notify = (msg) =>
    toast(msg, {
      autoClose: 500,
      hideProgressBar: true,
    });
  // const validate = async () => {
  //   const createTokenTest = async () => {
  //     let value = await fetch("http://localhost:3001/").then((response) =>
  //       response.json()
  //     );
  //     return value;
  //   };
  //   let token = localStorage.getItem("token");
  //   setValidated(
  //     localStorage.getItem("user") &&
  //     localStorage.getItem("user") === user + " " + token
  //   );

  // };

  return (
    <Context.Provider
      value={{
        numberOfResults,
        setNumberOfResults,
        torrentCategory,
        setTorrentCategory,
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
        notify,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
