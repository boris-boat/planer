import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory-pie";
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useStateContext } from "./StateContext";
import Topnavbar from "./navbar";

import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const Tracker = () => {
  const { REACT_APP_API_URL } = process.env;
  let user = localStorage.getItem("user");

  const [initialState, setInitialState] = useState(0);
  const [total, setTotal] = useState(0);
  const [newBill, setNewBill] = useState();
  const [billsTotal, setBillsTotal] = useState(0);
  const [newFood, setNewFood] = useState();
  const [foodTotal, setFoodTotal] = useState(0);
  const [newEntertainment, setNewEntertainment] = useState();
  const [entertainmentTotal, setEntertainmentTotal] = useState(0);
  const [newHealth, setNewHealth] = useState();
  const [healthTotal, setHealthTotal] = useState(0);
  const [newTransit, setNewTransit] = useState();
  const [transitTotal, setTransitTotal] = useState(0);
  const [newOther, setNewOther] = useState();
  const [otherTotal, setOtherTotal] = useState(0);

  const getTrackerInfo = async () => {
    fetch(REACT_APP_API_URL + "/trackerData" + user)
      .then((res) => res.json())
      .then((result) => setInitialState(result[0]))
      .catch((e) => console.log("Database error  : " + e));
    //setInitialState((prevState) => ({ ...prevState, bills: 5 }));
  };

  const setValues = () => {
    setFoodTotal(initialState.food);
    setBillsTotal(initialState.bills);
    setEntertainmentTotal(initialState.entertainment);
    setHealthTotal(initialState.health);
    setTransitTotal(initialState.transit);
    setOtherTotal(initialState.other);
    setTotal(
      initialState.bills +
        initialState.food +
        initialState.entertainment +
        initialState.health +
        initialState.transit +
        initialState.other
    );
  };
  const myData = [
    { x: "Bills", y: billsTotal },
    { x: "Food", y: foodTotal },
    { x: "Entertainment", y: entertainmentTotal },
    { x: "Health", y: healthTotal },
    { x: "Transportation", y: transitTotal },
    { x: "Other", y: otherTotal },
  ];
  const notify = (msg) =>
    toast(msg, {
      autoClose: 500,
      hideProgressBar: true,
    });
  const setTrackerData = (result) => {
    setInitialState(result);
  };

  useEffect(() => {
    getTrackerInfo();
  }, []);
  useEffect(() => {
    setValues();
  }, [initialState]);
  // useEffect(() => {
  //   addTotal();
  // }, [total]);
  let email;
  const addTotal = (num) => {
    setTotal(num);
  };

  const d = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const templateParams = {
    subject: "Expenses for the month of " + month[d.getMonth()] + " so far",
    bills: "Bills total : " + billsTotal,
    food: "Food total : " + foodTotal,
    entertainment: "Entertainment total : " + entertainmentTotal,
    health: "Health total : " + healthTotal,
    transit: "Transportation total : " + transitTotal,
    other: "Other total : " + otherTotal,
    total: "Total : " + total,
    email: email,
  };

  const handleEmailSendClick = async () => {
    templateParams.email = window.prompt("Enter your email adress ");

    await emailjs
      .send(
        "service_8zjjwsl",
        "template_jj6vqxs",
        templateParams,
        "user_i3lUVLnXsfDHhIpCb20P9"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          notify("Email sent !");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const resetAll = () => {
    setBillsTotal(0);
    setFoodTotal(0);
    setEntertainmentTotal(0);
    setHealthTotal(0);
    setTransitTotal(0);
    setOtherTotal(0);
    notify("Data has been reset!");
  };

  const saveData = async () => {
    await fetch(REACT_APP_API_URL + "/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: user,
        bills: billsTotal,
        entertainment: entertainmentTotal,
        food: foodTotal,
        health: healthTotal,
        other: otherTotal,
        transit: transitTotal,
      }),
    })
      .then((res) => res.json())
      .then((result) => setTrackerData(result))
      .catch((e) => console.log(e));
  };
  const resetData = async () => {
    await fetch(REACT_APP_API_URL + "/resetData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: user,
      }),
    })
      .then((res) => res.json())
      .then((result) => setTrackerData(result))
      .catch((e) => console.log(e));
    resetAll();
  };

  return (
    <div>
      <div>
        {initialState && user ? (
          <Container>
            <Row
              className="d-flex justify-content-center align-items-center mt-5"
              md={2}
              sm={1}
            >
              <Col className="mt-4">
                <Row>
                  <ToastContainer />
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewBill(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">Bills</InputGroup.Text>

                    <input
                      className="input-field"
                      placeholder="Expense"
                      value={newBill}
                      type="number"
                      pattern="/d+"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newBill === "number") {
                          setBillsTotal(billsTotal + newBill);
                          setNewBill("");
                          notify("Added");

                          addTotal((prevState) => prevState + newBill);
                        } else {
                          setNewBill("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newBill === "number") {
                          setBillsTotal(billsTotal - newBill);
                          setNewBill("");
                          notify("Substracted");
                          addTotal((prevState) => prevState - newBill);
                        } else {
                          setNewBill("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>
                </Row>
                <Row>
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewFood(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">Food</InputGroup.Text>
                    <input
                      className="input-field"
                      placeholder="Expense"
                      value={newFood}
                      type="number"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newFood === "number") {
                          setFoodTotal(foodTotal + newFood);
                          setNewFood("");
                          notify("Added");
                          addTotal((prevState) => prevState + newFood);
                        } else {
                          setNewFood("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newFood === "number") {
                          setFoodTotal(foodTotal - newFood);
                          setNewFood("");
                          notify("Substracted");
                          addTotal((prevState) => prevState - newFood);
                        } else {
                          setNewFood("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>
                </Row>
                <Row>
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewEntertainment(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">
                      Entertainment
                    </InputGroup.Text>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Expense"
                      value={newEntertainment}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newEntertainment === "number") {
                          setEntertainmentTotal(
                            entertainmentTotal + newEntertainment
                          );
                          setNewEntertainment("");
                          notify("Added");
                          addTotal((prevState) => prevState + newEntertainment);
                        } else {
                          setNewEntertainment("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newEntertainment === "number") {
                          setEntertainmentTotal(
                            entertainmentTotal - newEntertainment
                          );
                          setNewEntertainment("");
                          notify("Subtracted");
                          addTotal((prevState) => prevState - newEntertainment);
                        } else {
                          setNewEntertainment("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>
                </Row>
                <Row>
                  {" "}
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewHealth(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">Health</InputGroup.Text>
                    <input
                      className="input-field"
                      placeholder="Expense"
                      value={newHealth}
                      type="number"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newHealth === "number") {
                          setHealthTotal(healthTotal + newHealth);
                          setNewHealth("");
                          notify("Added");
                          addTotal((prevState) => prevState + newHealth);
                        } else {
                          setNewHealth("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newHealth === "number") {
                          setHealthTotal(healthTotal - newHealth);
                          setNewHealth("");
                          notify("Subtracted");
                          addTotal((prevState) => prevState - newHealth);
                        } else {
                          setNewHealth("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>
                </Row>
                <Row>
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewTransit(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">
                      Transportation
                    </InputGroup.Text>
                    <input
                      className="input-field"
                      placeholder="Expense"
                      value={newTransit}
                      type="number"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newTransit === "number") {
                          setTransitTotal(transitTotal + newTransit);
                          setNewTransit("");
                          notify("Added");
                          addTotal((prevState) => prevState + newTransit);
                        } else {
                          setNewTransit("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newTransit === "number") {
                          setTransitTotal(transitTotal - newTransit);
                          setNewTransit("");
                          notify("Subtracted");
                          addTotal((prevState) => prevState - newTransit);
                        } else {
                          setNewTransit("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>
                </Row>
                <Row>
                  {" "}
                  <InputGroup
                    className="mb-3"
                    onChange={(e) => {
                      setNewOther(parseInt(e.target.value));
                    }}
                  >
                    <InputGroup.Text id="basic-addon1">Other</InputGroup.Text>
                    <input
                      className="input-field"
                      placeholder="Expense"
                      value={newOther}
                      type="number"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newOther === "number") {
                          setOtherTotal(otherTotal + newOther);
                          setNewOther("");
                          notify("Added");
                          addTotal((prevState) => prevState + newOther);
                        } else {
                          setNewOther("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => {
                        if (typeof newOther === "number") {
                          setOtherTotal(otherTotal - newOther);
                          console.log(otherTotal);
                          addTotal((prevState) => prevState - newOther);
                          setNewOther("");
                          notify("Subtracted");
                        } else {
                          setNewOther("");
                          notify("Please enter a number !");
                        }
                      }}
                    >
                      Substract
                    </Button>
                  </InputGroup>{" "}
                  <Row>
                    <Button
                      className="w-100"
                      onClick={() => {
                        saveData();
                        notify("Data saved !");
                      }}
                    >
                      Save changes{" "}
                    </Button>
                  </Row>
                  <Row>
                    <Button
                      className="w-100 mt-3"
                      onClick={() => {
                        window.confirm(
                          "Are you sure you wish to reset all data? This cannot be undone!!!"
                        )
                          ? resetData()
                          : window.CloseEvent();
                      }}
                    >
                      Reset Data{" "}
                    </Button>
                  </Row>
                  <Row>
                    <Button
                      className="w-100 mt-3"
                      onClick={() => {
                        handleEmailSendClick();
                      }}
                    >
                      Send expense data to email.{" "}
                    </Button>
                  </Row>
                </Row>
              </Col>
              <Col style={{ "margin-top": 10 }}>
                <Container>
                  {<h1>{month[d.getMonth()]} expenses : </h1>}
                  <h2>Bills : {billsTotal}</h2>
                  <h2>Food : {foodTotal}</h2>
                  <h2>Entertainment : {entertainmentTotal}</h2>
                  <h2>Health : {healthTotal}</h2>
                  <h2>Transportation : {transitTotal}</h2>
                  <h2>Other : {otherTotal}</h2>
                  <h1>Total {total}</h1>
                </Container>
              </Col>
            </Row>
            <Col>
              {total ? (
                <VictoryPie
                  animate={{
                    duration: 1000,
                  }}
                  data={myData}
                  height={300}
                  width={600}
                  labels={({ datum }) => (datum.y === 0 ? "" : datum.x)}
                  colorScale={[
                    "#34568B",
                    "#FF6F61",
                    "#6B5B95",
                    "#F7CAC9",
                    "#92A8D1",
                    "#B565A7",
                  ]}
                  radius={100}
                />
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
          </Container>
        ) : (
          <h1>Expense tracker loading</h1>
        )}
        <Topnavbar />
      </div>
    </div>
  );
};

export default Tracker;
