import { Container, Col } from "react-bootstrap";
import "../App.css";


import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const Home = () => {

  const navigate = useNavigate();

  let user = localStorage?.getItem("user")?.split(" ")[0];

  // let token = localStorage.getItem("token");
 
 
  const textStyle = {verticalAlign : "middle",marginBottom : "0"}
  const center =
    "d-flex align-content-center justify-content-center align-items-center";
  useEffect(() => {
   
    
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
      // validate()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className={center} style={{ height: "100vh" }}>
     
          <>
            <Col style={{ paddingTop: "100px", height: "100vh" }}>
              <Col className={`mb-5 ${center} text-center`}>
                <h1 style={{ color: "white" }}>Greetings {user}</h1>
              </Col>

              <Col className={`${center}`}>
                <Container style={{ width: "60%" }} className="homeContainer">
                  {" "}
                  <div className="home" onClick={() => navigate("/todo")}>
                    <h4 style={textStyle}>ToDo's / Reminders</h4>{" "}
                    <img
                      className="logo"
                      src={require("../components/media/Icons/todo.jpg")}
                      alt=""
                    ></img>
                  </div>
                  <div className="home" onClick={() => navigate("/torrent")}>
                    {" "}
                    <h4 style={textStyle}>Torrent tracker</h4>
                    <img
                      className="logo"
                      src={require("../components/media/Icons/torrent.png")}
                      alt=""
                    ></img>
                  </div>
                  <div className="home" onClick={() => navigate("/news")}>
                    <h4 style={textStyle}>Daily news</h4>{" "}
                    <img
                      className="logo"
                      src={require("../components/media/Icons/news.png")}
                      alt=""
                    ></img>{" "}
                  </div>
                  <div className="home" onClick={() => navigate("/tracker")}>
                    <h4 style={textStyle}>Expense tracker </h4>
                    <img
                      className="logo align-self-center"
                      src={require("../components/media/Icons/money.png")}
                      alt=""
                    ></img>{" "}
                  </div>
                  <div className="home " onClick={() => navigate("/cookbook")}>
                    <h4 style={textStyle}>Kitchen Assistant</h4>
                    <img
                      className="logo align-self-center"
                      src={require("../components/media/Icons/hat.png")}
                      alt=""
                    ></img>
                  </div>
                  <div className="home " onClick={() => navigate("/quiz")}>
                    <h4 style={textStyle}>Quiz</h4>
                    <img
                      className="logo align-self-center"
                      src={require("../components/media/Icons/quiz.png")}
                      alt=""
                    ></img>
                  </div>
                 
                </Container>
              </Col>
            </Col>
          </>
      
      </Container>
    </>
  );
};

export default Home;
