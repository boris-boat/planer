import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showUserMailModal, setShowUserMailModal] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);
  const [torrentCategory, setTorrentCategory] = useState("All");
  const [searchBar, setSearchBar] = useState(true);
  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");
  const [testToken, setTestToken] = useState("");
  const [validated, setValidated] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState(10);
  const notify = (msg) =>
    toast(msg, {
      autoClose: 500,
      hideProgressBar: true,
    });
 

  return (
    <Context.Provider
      value={{
        userEmail,
        setUserEmail,
        showUserMailModal,
        setShowUserMailModal,
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
