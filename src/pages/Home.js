import { Container, Col, Button } from "react-bootstrap";
import "../App.css";

import "../index.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../components/StateContext";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  //const {testToken} = useStateContext()
  let user = localStorage.getItem("user")?.split(" ")[0];

  // let token = localStorage.getItem("token");

  const { setSearchBar } = useStateContext();

  useEffect(() => {
    setSearchBar(false);
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
      // validate()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container
        className="d-flex align-content-center justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {user ? (
          <>
            <Col style={{ paddingTop: "100px", height: "100vh" }}>
              <Col className="mb-5 d-flex align-content-center justify-content-center align-items-center text-center">
                <h1 style={{ color: "white" }}>Greetings {user}</h1>
              </Col>

              <Col className="d-flex justify-content-center align-content-center align-items-center ">
                <Container style={{ width: "60%" }}>
                  {" "}
                  <div className="home" onClick={() => navigate("/todo")}>
                    <h4 className="align-self-center">ToDo's / Reminders</h4>{" "}
                    <img 
                      className="logo align-self-center"
                      src={require("../components/media/Icons/todo.jpg")}
                      alt=""
                    ></img>
                  </div>
                  <div className="home" onClick={() => navigate("/torrent")}>
                    {" "}
                    <h4 className="align-self-center">Torrent tracker</h4>
                    <img
                      className="logo"
                      src={require("../components/media/Icons/torrent.png")}
                      alt=""
                    ></img>
                  </div>
                  <div className="home" onClick={() => navigate("/news")}>
                    <h4 className="align-self-center">Daily news</h4>{" "}
                    <img
                      className="logo"
                      src={require("../components/media/Icons/news.png")}
                      alt=""
                    ></img>{" "}
                  </div>
                  <div className="home" onClick={() => navigate("/tracker")}>
                    <h4 className="align-self-center">Expense tracker </h4>
                    <img
                      className="logo align-self-center"
                      src={require("../components/media/Icons/money.png")}
                      alt=""
                    ></img>{" "}
                  </div>
                  <div className="home " onClick={() => navigate("/cookbook")}>
                    <h4 className="align-self-center">Kitchen Assistant</h4>
                    <img
                      className="logo align-self-center"
                      src={require("../components/media/Icons/hat.png")}
                      alt=""
                    ></img>
                  </div>
                </Container>
              </Col>
            </Col>
          </>
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
};

export default Home;
