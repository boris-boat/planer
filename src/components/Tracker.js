import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory-pie";
import { Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useStateContext } from "./StateContext";
import Topnavbar from "./navbar";
import Vreme from "./vreme";
import News from "./news";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const Tracker = () => {
  const { REACT_APP_API_URL, EMAILJS_PUBLIC_KEY } = process.env;
  const { setVremeShow, setNewsShow, VremeShow, news, newsShow, user, data } =
    useStateContext();
  const notifyAdd = () =>
    toast("Added!", {
      autoClose: 500,
      hideProgressBar: true,
    });
  const emailSent = () =>
    toast("Email sent !", {
      autoClose: 500,
      hideProgressBar: true,
    });
  const notifySub = () =>
    toast("Substracted!", {
      autoClose: 500,
      hideProgressBar: true,
    });
  const changesSaved = () =>
    toast("Changes saved", {
      autoClose: 500,
      hideProgressBar: true,
    });
  const resetSaved = () =>
    toast("Data reset successful", {
      autoClose: 500,
      hideProgressBar: true,
    });
  const notifyError = () => {
    toast("Please enter a number", {
      autoClose: 500,
      hideProgressBar: true,
    });
  };
  let { bills, food, entertainment, health, transit, other } = data[0];

  useEffect(() => {
    addTotal();
  });
  let email;
  const [total, setTotal] = useState(0);
  const [newBill, setNewBill] = useState(null);
  const [billsTotal, setBillsTotal] = useState(bills);
  const [newFood, setNewFood] = useState(null);
  const [foodTotal, setFoodTotal] = useState(food);
  const [newEntertainment, setNewEntertainment] = useState(null);
  const [entertainmentTotal, setEntertainmentTotal] = useState(entertainment);
  const [newHealth, setNewHealth] = useState(null);
  const [healthTotal, setHealthTotal] = useState(health);
  const [newTransit, setNewTransit] = useState(null);
  const [transitTotal, setTransitTotal] = useState(transit);
  const [newOther, setNewOther] = useState(null);
  const [otherTotal, setOtherTotal] = useState(other);

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
  const addTotal = () => {
    setTotal(
      billsTotal +
        foodTotal +
        entertainmentTotal +
        healthTotal +
        transitTotal +
        otherTotal
    );
  };
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
          emailSent();
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  const setTrackerData = (result) => {
    data[0] = result;
  };
  const resetAll = () => {
    setBillsTotal(0);
    setFoodTotal(0);
    setEntertainmentTotal(0);
    setHealthTotal(0);
    setTransitTotal(0);
    setOtherTotal(0);
    resetSaved();
  };
  console.log(EMAILJS_PUBLIC_KEY);
  const myData = [
    { x: "Bills", y: billsTotal },
    { x: "Food", y: foodTotal },
    { x: "Entertainment", y: entertainmentTotal },
    { x: "Health", y: healthTotal },
    { x: "Transportation", y: transitTotal },
    { x: "Other", y: otherTotal },
  ];

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
        {data ? (
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
                          notifyAdd();
                        } else {
                          setNewBill("");
                          notifyError();
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
                          notifySub();
                        } else {
                          setNewBill("");
                          notifyError();
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
                          notifyAdd();
                        } else {
                          setNewFood("");
                          notifyError();
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
                          notifySub();
                        } else {
                          setNewFood("");
                          notifyError();
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
                          notifyAdd();
                        } else {
                          setNewEntertainment("");
                          notifyError();
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
                          notifySub();
                        } else {
                          setNewEntertainment("");
                          notifyError();
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
                          notifyAdd();
                        } else {
                          setNewHealth("");
                          notifyError();
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
                          notifySub();
                        } else {
                          setNewHealth("");
                          notifyError();
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
                          notifyAdd();
                        } else {
                          setNewTransit("");
                          notifyError();
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
                          notifySub();
                        } else {
                          setNewTransit("");
                          notifyError();
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
                          setOtherTotal(
                            parseInt(otherTotal) + parseInt(newOther)
                          );
                          setNewOther("");
                          notifyAdd();
                        } else {
                          setNewOther("");
                          notifyError();
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
                          setOtherTotal(
                            parseInt(otherTotal) - parseInt(newOther)
                          );
                          setNewOther("");
                          notifySub();
                        } else {
                          setNewOther("");
                          notifyError();
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
                        changesSaved();
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
                          "Are you sure you wish reset all data? This cannot be undone!!!"
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
              <Col>
                <Container style={{ "margin-top": 20 }}>
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
              {total !== 0 ? (
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
                ""
              )}
            </Col>
          </Container>
        ) : (
          <h1>Expense tracker loading</h1>
        )}
        <Topnavbar />

        <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
        <News show={newsShow} onHide={() => setNewsShow(false)} news={news} />
      </div>
    </div>
  );
};

export default Tracker;
