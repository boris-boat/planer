import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./404.styles.css";
const FourOFour = () => {
  //page showing 404 no page found

  const center =
    "d-flex align-content-center justify-content-center align-items-center flex-column";
  return (
    <div className={`${center} notFoundImg`}>
      <img
        // eslint-disable-next-line no-undef
        src={require("../../components/media/404.png")}
        alt=""
        className="imidz"
      ></img>
      <Link to="/home" replace={true}>
      <Button>Back</Button>
      </Link>
    </div>
  );
};

export default FourOFour;
