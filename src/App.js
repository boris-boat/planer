import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import Topnavbar from "./components/navbar";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./components/StateContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  const { setUser } = useStateContext();
  setUser(localStorage.getItem("user"));
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
    });
  });

  return (
    <>
      <Topnavbar />
      ""
      <Container
        className="d-flex mt-5 align-content-center justify-content-center align-items-center"
        style={{ height: "600px" }}
      >
        {user ? (
          <Col>
            <Row> </Row>
            <Row className="mb-5">
              <h1 className="d-flex mt-5 align-content-center justify-content-center align-items-center">
                Greetings {user}
              </h1>
            </Row>

            <Row className="d-flex justify-content-center align-content-center align-items-center ">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>ToDo's / Reminders</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Keep your life in order
                  </Card.Subtitle>
                  <Card.Text>
                    Simple app to create lists and reminders
                  </Card.Text>
                  <Card.Link href="/toDo"> ToDo's/Reminders</Card.Link>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Daily news from multiple sources</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Stay in touch with current events
                  </Card.Subtitle>
                  <Card.Text>Assorted news from various sites</Card.Text>
                  <Card.Link href="/news">News</Card.Link>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Expense tracker </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Dont wonder where the money went
                  </Card.Subtitle>
                  <Card.Text>
                    Keep track with expenses throughout the month
                  </Card.Text>
                  <Card.Link href="/tracker">Expense tracker</Card.Link>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        ) : (
          <div className="App">
            <h1 className="mt-5">Please create an account or login !</h1>
            <Button variant="primary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
