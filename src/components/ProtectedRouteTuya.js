import { Navigate } from "react-router-dom";
import { useStateContext } from "./StateContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { fullUserInfo } = useStateContext();
  console.log(fullUserInfo);
  const checkIfAllowed = () => {
    if (
      fullUserInfo.username !== "noske" ||
      fullUserInfo.email !== "g.wedge@gmail.com" ||
      fullUserInfo.username !== "Nensicka"
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
