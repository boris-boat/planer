import { Button } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import "./404.styles.css";
const FourOFour = () => {
  //page showing 404 no page found

  const center =
    "d-flex align-content-center justify-content-center align-items-center flex-column";
  return (
    <div className={`${center} notFoundImg`}>
      <img
        src={require("../../components/media/404.png")}
        alt=""
        className="imidz"
      ></img>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          <Navigate to="/login" />;
        }}
      >
        Back
      </Button>{" "}
    </div>
  );
};

export default FourOFour;
