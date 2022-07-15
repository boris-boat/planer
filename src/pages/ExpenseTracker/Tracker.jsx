import React, { useState, useEffect } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { Button as ButtonPrime } from "primereact/button";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useStateContext } from "../../components/StateContext";
import "./tracker.css";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailModal from "../../components/EmailModal";

const Tracker = () => {
  const { notify, userEmail, showUserMailModal, setShowUserMailModal } =
    useStateContext();

  const { REACT_APP_API_URL } = process.env;
  let user = localStorage.getItem("user")?.split(" ")[0];

  const [expense, setExpense] = useState("");
  const [value, setValue] = useState(0);
  const [initialState, setInitialState] = useState(0);
  const [total, setTotal] = useState(0);
  const [otherNote, setOtherNote] = useState("");
  const [showNoteModal, setshowNoteModal] = useState(false);

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

  const handleClick =  (expense) => {
    operand === "+"
      ? setTotal((prevState) => prevState + parseInt(value))
      : setTotal((prevState) => prevState - parseInt(value));
    switch (expense) {
      case "Bills":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            bills: initialState.bills + parseInt(value),
          }));
          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            bills: initialState.bills - parseInt(value),
          }));
          resetValue("Subtracted");
        }

        break;
      case "Food":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            food: initialState.food + parseInt(value),
          }));

          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            food: initialState.food - parseInt(value),
          }));

          resetValue("Subtracted");
        }
        resetValue();
        break;
      case "Entertainment":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            entertainment: initialState.entertainment + parseInt(value),
          }));

          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            entertainment: initialState.entertainment - parseInt(value),
          }));

          resetValue("Subtracted");
        }
        break;
      case "Health":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            health: initialState.health + parseInt(value),
          }));

          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            health: initialState.health - parseInt(value),
          }));

          resetValue("Subtracted");
        }

        break;
      case "Transportation":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            transit: initialState.transit + parseInt(value),
          }));

          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            transit: initialState.transit - parseInt(value),
          }));
          resetValue("Subtracted");
        }

        break;
      case "Other":
        if (operand === "+") {
          setInitialState((prev) => ({
            ...prev,
            other: initialState.other + parseInt(value),
          }));
          resetValue("Added");
        }
        if (operand === "-") {
          setInitialState((prev) => ({
            ...prev,
            other: initialState.other - parseInt(value),
          }));

          resetValue("Subtracted");
        }

        break;

      default:
        break;
    }
  };

  const expenses = [
    { type: "Bills", value: "Bills" },
    { type: "Food", value: "Food" },
    { type: "Entertainment", value: "Entertainment" },
    { type: "Health", value: "Health" },
    { type: "Transportation", value: "Transportation" },
    { type: "Other", value: "Other" },
  ];

  useEffect(() => {
    //on load getting prev values from db
    try {
      getTrackerInfo();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    //adding total expenses
    let totalExpenses = 0;
    for (let i = 2; i < 8; i++) {
      totalExpenses = totalExpenses + parseInt(Object.values(initialState)[i]);
    }
    setTotal(totalExpenses);
    setOtherNote(initialState.otherNote)
  }, [initialState]);

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
    bills: "Bills total : " + initialState.bills,
    food: "Food total : " + initialState.food,
    entertainment: "Entertainment total : " + initialState.entertainment,
    health: "Health total : " + initialState.health,
    transit: "Transportation total : " + initialState.transit,
    other: "Other total : " + initialState.other,
    total: "Total : " + total,
    email: userEmail,
  };

  const handleEmailSendClick = async () => {
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

  //stavi save data posle svakog klika
  const saveData = async () => {
    await fetch(REACT_APP_API_URL + "/tracker/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: user,
        bills: initialState.bills,
        entertainment: initialState.entertainment,
        food: initialState.food,
        health: initialState.health,
        other: initialState.other,
        transit: initialState.transit,
        otherNote: otherNote,
      }),
    })
      .then((res) => res.json())
      .then((result) => setInitialState(result)).then(setOtherNote(initialState.otherNote))
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
      .then((result) => setInitialState(result))
      .catch((e) => console.log(e));
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
                <h2>Bills : {initialState.bills}</h2>
                <h2>Food : {initialState.food}</h2>
                <h2>Entertainment : {initialState.entertainment}</h2>
                <h2>Health : {initialState.health}</h2>
                <h2>Transportation : {initialState.transit}</h2>
                <h2 className="d-flex flex-row justify-content-between">
                  Other : {initialState.other}{" "}
                  <h2
                    className="otherNote"
                    onClick={() => setshowNoteModal(true)}
                  >
                    Note
                  </h2>
                </h2>
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

          <Modal
            onHide={() => {
              setshowNoteModal(false);
            }}
            show={showNoteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>NOTES</Modal.Header>
            <Modal.Body>
              <textarea
                style={{ width: "100%", height: "300px" }}
                value={otherNote}
                onChange={(e) => setOtherNote(e.target.value)}
              ></textarea>
            </Modal.Body>
          </Modal>
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
