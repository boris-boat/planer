import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import Topnavbar from "./components/navbar";
import { useEffect } from "react";
import { useStateContext } from "./components/StateContext";
import "./index.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  const { setData } = useStateContext();

  const { REACT_APP_API_URL } = process.env;
  const getTrackerInfo = async () => {
    fetch(REACT_APP_API_URL + "/trackerData" + user)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.log("Database error  : " + e));
    console.log("cita tracker data i koristi : " + user);
  };
  useEffect(() => {
    getTrackerInfo();
  }, []);

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
            <Row>"</Row>
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
