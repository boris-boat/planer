import React from "react";
import "../App.css";
import { Modal, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
const { REACT_APP_WEATHERID } = process.env;

export default function TomorrowVreme(props) {
  const [opis, setOpis] = useState("");
  const [error, setError] = useState("");

  const getVreme = async () => {
    let lat = localStorage.getItem("lat");
    let long = localStorage.getItem("long");

    if (lat && long) {
      fetch(
        //`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${REACT_APP_WEATHERID}`
        `https://api.openweathermap.org/data/2.5/onecall?lat=45.056&lon=20.0769536&units=metric&exclude=current,minutely,hourly&appid=747d06c8d7fa302992892c63640f74ea`
      )
        .then((res) => /*res.json()*/ console.log(res.json()))
        .then((result) => {
          console.log("tomorrow" + result);

          setOpis();
        })
        .then((response) => console.log(response));
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
              {} today - {opis}
            </h1>
          ) : (
            <h1>Location access denied.</h1>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!error ? (
          <ListGroup>
            <ListGroup.Item>Temp now : {Math.round()} °C</ListGroup.Item>
            <ListGroup.Item>Real feel : {Math.round()} °C</ListGroup.Item>
            <ListGroup.Item>Min temp : {Math.round()} °C</ListGroup.Item>
            <ListGroup.Item>Max temp : {Math.round()} °C</ListGroup.Item>
            <ListGroup.Item>Humidity : {Math.round()} %</ListGroup.Item>
          </ListGroup>
        ) : (
          <h1>Please refresh the page and allow location access.</h1>
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
