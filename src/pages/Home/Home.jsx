import { Col, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./Home.styles.css";
import { ReactComponent as ToDoImg } from "../../components/media/ilustrations/to_do_list.svg";
import { ReactComponent as TorrentImg } from "../../components/media/ilustrations/download.svg";
import { ReactComponent as NewsImg } from "../../components/media/ilustrations/news.svg";
import { ReactComponent as ExpenseImg } from "../../components/media/ilustrations/reciept.svg";
import { ReactComponent as CookingImg } from "../../components/media/ilustrations/cook.svg";
import { ReactComponent as QuizImg } from "../../components/media/ilustrations/quiz.svg";
import { ReactComponent as ChatImg } from "../../components/media/ilustrations/chat.svg";

const Home = () => {
  const navigate = useNavigate();

  let user = localStorage.getItem("user");
  const textStyle = { verticalAlign: "middle", marginBottom: "0" };
  const center =
    "d-flex align-content-center justify-content-center align-items-center";
  useEffect(() => {
    //gets current location for weather info
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("long", position.coords.longitude);
      localStorage.setItem("lat", position.coords.latitude);
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
              <Container className="homeContainer">
                {" "}
                <div className="home toDo" onClick={() => navigate("/todo")}>
                  <h4 style={textStyle}>ToDo's / Reminders</h4>{" "}
                  <img
                    className="logo"
                    src={require("../../components/media/Icons/todo.jpg")}
                    alt=""
                  ></img>
                </div>
                <div className="align-self-center toDoListImg">
                  <ToDoImg />
                </div>
                <div className="home chat" onClick={() => navigate("/join")}>
                  <h4 style={textStyle}>Chat</h4>{" "}
                  <img
                    style={{ borderRadius: "10px" }}
                    className="logo"
                    src={require("../../components/media/Icons/chat.png")}
                    alt=""
                  ></img>
                </div>
                <div className="align-self-center chatImg">
                  <ChatImg />
                </div>
                <div
                  className="home torrent"
                  onClick={() => navigate("/torrent")}
                >
                  {" "}
                  <h4 style={textStyle}>Torrent tracker</h4>
                  <img
                    className="logo"
                    src={require("../../components/media/Icons/torrent.png")}
                    alt=""
                  ></img>
                </div>
                <div className="align-self-center torrentImg">
                  <TorrentImg />
                </div>
                <div className="home news" onClick={() => navigate("/news")}>
                  <h4 style={textStyle}>Daily news</h4>{" "}
                  <img
                    className="logo"
                    src={require("../../components/media/Icons/news.png")}
                    alt=""
                  ></img>{" "}
                </div>
                <div className="align-self-center newsImg">
                  <NewsImg />
                </div>
                <div
                  className="home expense"
                  onClick={() => navigate("/tracker")}
                >
                  <h4 style={textStyle}>Expense tracker </h4>
                  <img
                    className="logo align-self-center"
                    src={require("../../components/media/Icons/money.png")}
                    alt=""
                  ></img>{" "}
                </div>
                <div className="align-self-center expenseImg">
                  <ExpenseImg />
                </div>
                <div
                  className="home cook"
                  onClick={() => navigate("/cookbook")}
                >
                  <h4 style={textStyle}>Kitchen Assistant</h4>
                  <img
                    className="logo align-self-center"
                    src={require("../../components/media/Icons/hat.png")}
                    alt=""
                  ></img>
                </div>
                <div className="align-self-center cookImg">
                  <CookingImg />
                </div>
                <div className="home quiz" onClick={() => navigate("/quiz")}>
                  <h4 style={textStyle}>Quiz</h4>
                  <img
                    className="logo align-self-center"
                    src={require("../../components/media/Icons/quiz.png")}
                    alt=""
                  ></img>
                </div>
                <div className="align-self-center quizImg">
                  <QuizImg />
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
