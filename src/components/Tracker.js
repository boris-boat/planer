import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory-pie";
import { Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useStateContext } from "./StateContext";
import Topnavbar from "./navbar";
import Vreme from "./vreme";
import News from "./news";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tracker = () => {
  const { REACT_APP_API_URL } = process.env;
  const {
    setVremeShow,

    setNewsShow,
    VremeShow,
    news,
    newsShow,
    user,
    data,
  } = useStateContext();

  const notifyAdd = () =>
    toast("Added!", {
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

  useEffect(() => {
    addTotal();
  });

  let { bills, food, entertainment, health, transit, other } = data[0];
  const [total, setTotal] = useState(0);
  const [newBill, setNewBill] = useState(0);
  const [billsTotal, setBillsTotal] = useState(bills);
  const [newFood, setNewFood] = useState(0);
  const [foodTotal, setFoodTotal] = useState(food);
  const [newEntertainment, setNewEntertainment] = useState(0);
  const [entertainmentTotal, setEntertainmentTotal] = useState(entertainment);
  const [newHealth, setNewHealth] = useState(0);
  const [healthTotal, setHealthTotal] = useState(health);
  const [newTransit, setNewTransit] = useState(0);
  const [transitTotal, setTransitTotal] = useState(transit);
  const [newOther, setNewOther] = useState(0);
  const [otherTotal, setOtherTotal] = useState(other);

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
  };
  //console.log(window.location.pathname);
  const myData = [
    { x: "Bills", y: billsTotal },
    { x: "Food", y: foodTotal },
    { x: "Entertainment", y: entertainmentTotal },
    { x: "Health", y: healthTotal },
    { x: "Transportation", y: transitTotal },
    { x: "Other", y: otherTotal },
  ];

  const saveData = async () => {
    await fetch("http://localhost:3001/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: user,
        bills: parseInt(billsTotal),
        entertainment: parseInt(entertainmentTotal),
        food: parseInt(foodTotal),
        health: parseInt(healthTotal),
        other: parseInt(otherTotal),
        transit: parseInt(transitTotal),
      }),
    })
      .then((res) => res.json())
      .then((result) => setTrackerData(result))
      .catch((e) => console.log(e));
  };
  const resetData = async () => {
    await fetch("http://localhost:3001/resetData", {
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
        <Topnavbar />
        {console.log(data[0])}
        <Vreme show={VremeShow} onHide={() => setVremeShow(false)} />
        <News show={newsShow} onHide={() => setNewsShow(false)} news={news} />
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center mt-5"
            md={2}
            sm={1}
          >
            <Col className="mt-5">
              <Row>
                <ToastContainer />
                <InputGroup
                  className="mb-3"
                  onChange={(e) => {
                    setNewBill(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">Bills</InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setBillsTotal(parseInt(billsTotal) + parseInt(newBill));
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setBillsTotal(parseInt(billsTotal) - parseInt(newBill));
                      notifySub();
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
                    setNewFood(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">Food</InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setFoodTotal(parseInt(foodTotal) + parseInt(newFood));
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setFoodTotal(parseInt(foodTotal) - parseInt(newFood));
                      notifySub();
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
                    setNewEntertainment(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">
                    Entertainment
                  </InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setEntertainmentTotal(
                        parseInt(entertainmentTotal) +
                          parseInt(newEntertainment)
                      );
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setEntertainmentTotal(
                        parseInt(entertainmentTotal) -
                          parseInt(newEntertainment)
                      );
                      notifySub();
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
                    setNewHealth(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">Health</InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setHealthTotal(
                        parseInt(healthTotal) + parseInt(newHealth)
                      );
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setHealthTotal(
                        parseInt(healthTotal) - parseInt(newHealth)
                      );
                      notifySub();
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
                    setNewTransit(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">
                    Transportation
                  </InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setTransitTotal(
                        parseInt(transitTotal) + parseInt(newTransit)
                      );
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setTransitTotal(
                        parseInt(transitTotal) - parseInt(newTransit)
                      );
                      notifySub();
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
                    setNewOther(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">Other</InputGroup.Text>
                  <input className="input-field" placeholder="Expense" />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setOtherTotal(parseInt(otherTotal) + parseInt(newOther));
                      notifyAdd();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => {
                      setOtherTotal(parseInt(otherTotal) - parseInt(newOther));
                      notifySub();
                    }}
                  >
                    Substract
                  </Button>
                </InputGroup>
                <Row>
                  <Button
                    className="w-50"
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
                    className="w-50 mt-3"
                    onClick={() => {
                      resetData();
                      resetSaved();
                    }}
                  >
                    Reset Data{" "}
                  </Button>
                </Row>
              </Row>
            </Col>
            <Col className="d-flex justify-items-start">
              <div>
                <h2>Bills : {billsTotal}</h2>
                <h2>Food : {foodTotal}</h2>
                <h2>Entertainment : {entertainmentTotal}</h2>
                <h2>Health : {healthTotal}</h2>
                <h2>Transportation : {transitTotal}</h2>
                <h2>Other : {otherTotal}</h2>
                <h1>Total {total}</h1>
              </div>
            </Col>
          </Row>
          <Col>
            {total !== 0 ? (
              <VictoryPie
                data={myData}
                height={300}
                width={600}
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
      </div>
    </div>
  );
};

export default Tracker;
