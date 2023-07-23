import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

import "./Tuya.styles.css";
const Tuya = () => {
  // eslint-disable-next-line no-undef
  const { REACT_APP_API_URL } = process.env;

  const handleSendCommandTV = async () => {
    await axios.post(REACT_APP_API_URL + "/tuya/tv", { data: "Power" });
  };
  const handleSendCommandAc = async (command) => {
    await axios.post(REACT_APP_API_URL + "/tuya/ac", { data: command });
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <Container className="remote-container">
        <div className="tv-container">
          <Button
            className="btn-info tv-button"
            onClick={() => handleSendCommandTV()}
          >
            TV
          </Button>
        </div>
        <div className="ac-container">
          <Button
            className="remote btn-info"
            onClick={() => handleSendCommandAc("PowerOn")}
          >
            AC On
          </Button>
          <Button
            className="remote btn-info"
            onClick={() => handleSendCommandAc("PowerOff")}
          >
            AC Off
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default Tuya;
