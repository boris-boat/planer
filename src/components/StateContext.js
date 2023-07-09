import React, { createContext, useCallback, useContext, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spinnerIsLoading, setSpinnerIsLoading] = useState(false);

  const notify = useCallback((msg) =>
  toast(msg, {
    autoClose: 500,
    hideProgressBar: true,
  }), []);

  return (
    <Context.Provider
      value={{
        spinnerIsLoading,
        setSpinnerIsLoading,
        setIsLoggedIn,
        isLoggedIn,
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
