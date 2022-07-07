import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const FourOFour = () => {
  const navigate = useNavigate();
  const center =
    "d-flex align-content-center justify-content-center align-items-center flex-column";
  return (
    <div className={`${center} pt-5`}>
      <img src={require("../../components/media/404.png")} alt=""></img>
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
