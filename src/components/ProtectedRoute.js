import { Navigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import React from "react"

const ProtectedRoute = ({ children }) => {
  const { fullUserInfo } = useStateContext();

  //component that checks for user object

  if (!fullUserInfo || fullUserInfo?.message === "Auth failed") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
