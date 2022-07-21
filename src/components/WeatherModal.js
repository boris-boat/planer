import React from "react";
import "../App.css";
import { Modal, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
const { REACT_APP_WEATHERID } = process.env;

export default function Vreme(props) {
//weather info modal

  const [trenutnoVreme, settrenutnoVreme] = useState([]);
  const [grad, setGrad] = useState("");
  const { temp, feels_like, temp_min, temp_max, humidity } = trenutnoVreme;
  const [opis, setOpis] = useState("");
  const [error, setError] = useState("");

  const getVreme = async () => {
    let lat = localStorage.getItem("lat");
    let long = localStorage.getItem("long");

    if (lat && long) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${REACT_APP_WEATHERID}`
      )
        .then((res) => res.json())
        .then((result) => {
          settrenutnoVreme(result.main);
          setGrad(result.name);
          setOpis(result.weather[0].description);
        });
    } else {
      setError("Location access denied");
    }
  };

  useEffect(() => {
    getVreme();
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {!error ? (
            <h1>
              {grad} today - {opis}
            </h1>
          ) : (
            <h1>Location access denied.</h1>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!error ? (
          <ListGroup>
            <ListGroup.Item>Temp now : {Math.round(temp)} °C</ListGroup.Item>
            <ListGroup.Item>
              Real feel : {Math.round(feels_like)} °C
            </ListGroup.Item>
            <ListGroup.Item>
              Min temp : {Math.round(temp_min)} °C
            </ListGroup.Item>
            <ListGroup.Item>
              Max temp : {Math.round(temp_max)} °C
            </ListGroup.Item>
            <ListGroup.Item>Humidity : {Math.round(humidity)} %</ListGroup.Item>
          </ListGroup>
        ) : (
          <h1>Please refresh the page and allow location access.</h1>
        )}
      </Modal.Body>
    </Modal>
  );
}
