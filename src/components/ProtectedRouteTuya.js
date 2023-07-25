import { Navigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { fullUserInfo } = useStateContext();
  // eslint-disable-next-line no-undef
  const { REACT_APP_USER1, REACT_APP_USER2 } = process.env;
  const checkIfAllowed = () => {
    if (
      fullUserInfo.username !== REACT_APP_USER1 ||
      fullUserInfo.email !== "g.wedge@gmail.com" ||
      fullUserInfo.username !== REACT_APP_USER2
    )
      return false;
  };
  //component that checks for user object

  if (
    !fullUserInfo ||
    fullUserInfo?.message === "Auth failed" ||
    checkIfAllowed()
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
