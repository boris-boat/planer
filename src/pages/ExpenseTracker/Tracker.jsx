import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { Button as ButtonPrime } from "primereact/button";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useStateContext } from "../../components/StateContext";
import "./tracker.css";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailModal from "../../components/EmailModal";



const Tracker = () => {
  const {
    setSearchBar,
    notify,
    userEmail,
    showUserMailModal,
    setShowUserMailModal,
  } = useStateContext();

  const { REACT_APP_API_URL } = process.env;
  let user = localStorage.getItem("user")?.split(" ")[0];

  const [expense, setExpense] = useState("");
  const [value, setValue] = useState(0);
  const [initialState, setInitialState] = useState(0);
  const [total, setTotal] = useState(0);
  const [billsTotal, setBillsTotal] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);
  const [entertainmentTotal, setEntertainmentTotal] = useState(0);
  const [healthTotal, setHealthTotal] = useState(0);
  const [transitTotal, setTransitTotal] = useState(0);
  const [otherTotal, setOtherTotal] = useState(0);
  let operand;
  const resetValue = (msg) => {
    setValue(0);
    notify(msg);
  };

  const getTrackerInfo = async () => {
    fetch(REACT_APP_API_URL + "/tracker/trackerData" + user)
      .then((res) => res.json())
      .then((result) => setInitialState(result[0]))
      .catch((e) => console.log("Database error  : " + e));
  };

  const handleClick = async (expense) => {
    operand === "+"
      ? addTotal((prevState) => prevState + parseInt(value))
      : addTotal((prevState) => prevState - parseInt(value));
    switch (expense) {
      case "Bills":
        if (operand === "+") {
          setBillsTotal(billsTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setBillsTotal(billsTotal - parseInt(value));
          resetValue("Subtracted");
        }

        break;
      case "Food":
        if (operand === "+") {
          setFoodTotal(foodTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setFoodTotal(foodTotal - parseInt(value));
          resetValue("Subtracted");
        }
        resetValue();
        break;
      case "Entertainment":
        if (operand === "+") {
          setEntertainmentTotal(entertainmentTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setEntertainmentTotal(entertainmentTotal - parseInt(value));
          resetValue("Subtracted");
        }
        break;
      case "Health":
        if (operand === "+") {
          setHealthTotal(healthTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setHealthTotal(healthTotal - parseInt(value));
          resetValue("Subtracted");
        }

        break;
      case "Transportation":
        if (operand === "+") {
          setTransitTotal(transitTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setTransitTotal(transitTotal - parseInt(value));
          resetValue("Subtracted");
        }

        break;
      case "Other":
        if (operand === "+") {
          setOtherTotal(otherTotal + parseInt(value));
          resetValue("Added");
        }
        if (operand === "-") {
          setOtherTotal(otherTotal - parseInt(value));
          resetValue("Subtracted");
        }

        break;

      default:
        break;
    }
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

  const expenses = [
    { type: "Bills", value: "Bills" },
    { type: "Food", value: "Food" },
    { type: "Entertainment", value: "Entertainment" },
    { type: "Health", value: "Health" },
    { type: "Transportation", value: "Transportation" },
    { type: "Other", value: "Other" },
  ];
  const setTrackerData = (result) => {
    setInitialState(result);
  };

  useEffect(() => {
    setSearchBar(false);
    try {
      getTrackerInfo();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      setValues();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

 
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
    email: userEmail,
  };

  const handleEmailSendClick = async () => {
    console.log(userEmail);

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
  //stavi save data posle svakog klika
  const saveData = async () => {
    await fetch(REACT_APP_API_URL + "/tracker/saveData", {
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
    await fetch(REACT_APP_API_URL + "/tracker/resetData", {
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
    <div style={{ paddingTop: "60px" }}>
      <ToastContainer position="top-center" />
      <div style={{ paddingTop: "50px" }} className="trackerBigContainer">
      
          <Container
            style={{ width: "100%" }}
            className="d-flex flex-wrap-no-wrap justify-content-center trackerContainer"
          >
            <Row
              className="d-flex justify-content-center"
              md={2}
              sm={1}
              style={{ width: "100%" }}
            >
              <Col>
                <Container className="inputContainer">
                  <div className="leftInputContainer">
                    {" "}
                    <Dropdown
                      style={{ width: "50%" }}
                      value={expense}
                      optionLabel="type"
                      placeholder="Select expense"
                      options={expenses}
                      onChange={(e) => setExpense(e.value)}
                    ></Dropdown>
                    <AutoComplete
                      style={{ width: "25%" }}
                      value={value}
                      className="expenseInput"
                      placeholder="Value"
                      type="number"
                      onChange={(e) => setValue(e.value)}
                    ></AutoComplete>
                  </div>

                  <Container className="inputButtonContainer">
                    <ButtonPrime
                      onClick={() => {
                        if (expense && value > 0) {
                          operand = "+";
                          handleClick(expense);
                        }
                        if (value < 1) {
                          notify("Expense value must be greater than 0");
                        } else if (!expense) {
                          notify("Please select expense!");
                        }
                      }}
                      className="add"
                    >
                      Add
                    </ButtonPrime>
                    <ButtonPrime
                      className="subtract"
                      onClick={() => {
                        if (expense && value > 0) {
                          operand = "-";
                          handleClick(expense);
                        }
                        if (value < 1) {
                          notify("Expense value must be greater than 0");
                        } else if (!expense) {
                          notify("Please select expense!");
                        }
                      }}
                    >
                      Subtract
                    </ButtonPrime>
                  </Container>
                </Container>

                <Container className="totals" style={{ marginTop: "10px" }}>
                  {<h1 className="month">{month[d.getMonth()]} expenses : </h1>}
                  <h2>Bills : {billsTotal}</h2>
                  <h2>Food : {foodTotal}</h2>
                  <h2>Entertainment : {entertainmentTotal}</h2>
                  <h2>Health : {healthTotal}</h2>
                  <h2>Transportation : {transitTotal}</h2>
                  <h2>Other : {otherTotal}</h2>
                  <h1 className="total">Total {total}</h1>
                </Container>

                <Container
                  className="buttonContainer"
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Row style={{ width: "30%" }}>
                    <Button
                      onClick={() => {
                        saveData();
                        notify("Data saved !");
                      }}
                    >
                      Save changes{" "}
                    </Button>
                  </Row>
                  <Row style={{ width: "30%" }}>
                    <Button
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
                  <Row style={{ width: "40%" }}>
                    <Button
                      onClick={() => {
                       
                        setShowUserMailModal(true);
                      }}
                    >
                      Send expense data to email.{" "}
                    </Button>
                  </Row>
                </Container>
              </Col>
            </Row>
           
            <EmailModal
              onExited={() => {
                if (userEmail) handleEmailSendClick();
              }}
              onHide={() => {
                setShowUserMailModal(false);
              }}
              show={showUserMailModal}
            />
          </Container>
        
          
        
      </div>
    </div>
  );
};

export default Tracker;
