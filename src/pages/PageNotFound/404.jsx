import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./404.styles.css"
const FourOFour = () => {
  const navigate = useNavigate();
  const center =
    "d-flex align-content-center justify-content-center align-items-center flex-column";
  return (
    <div className={`${center} notFoundImg`}>
      <img src={require("../../components/media/404.png")} alt="" className="imidz" ></img>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Back
      </Button>{" "}
    </div>
  );
};

export default FourOFour;
