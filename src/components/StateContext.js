import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();
export const StateContext = ({ children }) => {
  const { REACT_APP_API_URL } = process.env;
  const [category, setCategory] = useState("Everything");
  const [VremeShow, setVremeShow] = useState(false);
  const [user, setUser] = useState("");

  const [search, setSearch] = useState("");
  const [newTodo, setnewTodo] = useState("");
  const [creator, setCreator] = useState("");

  // const getTrackerInfo = async () => {
  //   fetch(REACT_APP_API_URL + "/trackerData" + user)
  //     .then((res) => res.json())
  //     .then((result) => setData(result))
  //     .catch((e) => console.log("Database error  : " + e));
  //   console.log("cita tracker data i koristi : " + user, data);
  // };

  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        VremeShow,
        setVremeShow,

        search,
        setSearch,
        newTodo,
        setnewTodo,
        creator,
        setCreator,

        // getTrackerInfo,

        setUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
