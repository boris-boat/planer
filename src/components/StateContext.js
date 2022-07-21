import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showUserMailModal, setShowUserMailModal] = useState(false);
  const [fullUserInfo, setFullUserInfo] = useState(null);
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);
  const [torrentCategory, setTorrentCategory] = useState("All");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");
  const [testToken, setTestToken] = useState("");
  const [validated, setValidated] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState(10);
  let user = localStorage.getItem("user")

  const { REACT_APP_API_URL } = process.env;

  const notify = (msg) =>
    toast(msg, {
      autoClose: 500,
      hideProgressBar: true,
    });
  let fetchFullUserInfo = () => {
    fetch(REACT_APP_API_URL + "/user/getuser/" + user)
      .then((res) => res.json())
      .then((result) => setFullUserInfo(result));
  };
  useEffect(() => {
    
    fetchFullUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider
      value={{
        fetchFullUserInfo,
        setFullUserInfo,
        fullUserInfo,
        showUserMailModal,
        setShowUserMailModal,
        numberOfResults,
        setNumberOfResults,
        torrentCategory,
        setTorrentCategory,
        validated,
        setValidated,

        category,
        setCategory,
        VremeShow,
        setVremeShow,
        setTestToken,
        testToken,

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
