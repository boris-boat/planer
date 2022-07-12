import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Card, Container, Form, InputGroup, Spinner } from "react-bootstrap";

const Quiz = () => {
  const div = useRef(null);
  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [loadNext, setLoadNext] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(-1);
  const [questionCount, setQuestionCount] = useState(0);
  const [openModal, setOpenModal] = useState(true);
  const [input, setInput] = useState(0);
  const handleClose = () => {
    setTotalQuestions(-1);
    setOpenModal(false);
  };
  let user = localStorage.getItem("user")?.split(" ")[0];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const center =
    "d-flex align-content-center justify-content-center align-items-center";
  let randomGenerator = () => {
    return Math.floor(Math.random() * 4);
  };
  const handleAnswer = (e) => {
    for (let child of div.current.children) {
      if (child.textContent === question[0].correctAnswer) {
        child.style.backgroundColor = "green";
      }
    }

    if (question[0]?.correctAnswer === e.target.textContent) {
      e.currentTarget.style.backgroundColor = "green";
      setScore((score) => score + 1);
    } else {
      e.currentTarget.style.backgroundColor = "red";
    }
  

    setTimeout(() => {
      setTotalQuestions((prev) => prev - 1);
      setLoadNext(e.target.textContent);
    }, 1000);
  };
  useEffect(() => {
    const getQuestions = async () => {
      fetch("https://the-trivia-api.com/api/questions?limit=1")
        .then((res) => res.json())
        .then((result) => setQuestion(result));
    };

    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadNext]);
  useEffect(() => {
    if (question[0]?.incorrectAnswers.length) {
      const answers = [...question[0].incorrectAnswers];
      answers.splice(randomGenerator(), 0, question[0].correctAnswer);
      setOptions(answers);
    }
  }, [question]);

  return (
    <Container className={center} style={{ height: "100vh" }}>
      {totalQuestions > 0 ? (
        <Container
          className={`d-flex align-content-center quizCointainer text-center`}
          style={{ height: "80%" }}
        >
          <Container
            className="questionCointainer d-flex  justify-content-center align-items-center flex-column "
            style={{ width: "30%", height: "70%" }}
          >{totalQuestions > 1  ? (<h2>{totalQuestions} rounds left</h2>) : (<h2>Last round</h2>)} 
            {question.length !== 0 ? (
              <Card style={{ backgroundColor: "black", color: "white" }}>
                
                {question[0].question}
              </Card>
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Container>
          <Container
            ref={div}
            className={`${center} flex-column answersCointainer`}
            style={{ width: "30%", height: "70%" }}
          >
            {options.length !== 0 ? (
              options.map((option) => (
                <Button
                  variant="contained"
                  style={{ width: "50%", margin: "10px" }}
                  key={option}
                  onClick={(e) => {
                    handleAnswer(e);
                  }}
                >
                  {option}
                </Button>
              ))
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Container>
        </Container>
      ) : totalQuestions < 0 ? (
        <Container
          className={`${center} flex-column`}
          style={{ marginTop: "-200px" }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              setTotalQuestions(input);
              setQuestionCount(input);
            }}
          >
            <Container className="text-center" style={{ color: "white" }}>
              {" "}
              <h1>QUIZ</h1>
              <h1>Test your general knowledge !</h1>
              <h2>Please enter number of rounds :</h2>
            </Container>

            <InputGroup className={`${center} flex-column`}>
              <input
                min={"1"}
                className="input-field mb-2"
                type="number"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <Button type="submit" variant="contained" id="button-addon2">
                Start game!
              </Button>
            </InputGroup>
          </Form>
        </Container>
      ) : (
        <Container>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className={`${center} modalContainer`}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
                style={{ marginRight: "20px" }}
              >
                {score / questionCount > 0.5 ? (
                  <>
                    <h5>Congratulations {user}</h5>
                    <h5>
                      {" "}
                      Your score is {score} out of {questionCount}
                    </h5>
                  </>
                ) : (
                  <>
                    <h5>Hey it all counts !</h5>
                    <h5>
                      Your score is {score} out of {questionCount}
                    </h5>
                  </>
                )}
              </Typography>
              <Button
                style={{ marginLeft: "10px" }}
                variant="contained"
                onClick={() => {
                  setTotalQuestions(-1);

                  setQuestionCount(0);
                  setScore(0);
                  setOpenModal(true);
                }}
              >
                Start new game?
              </Button>
            </Box>
          </Modal>
        </Container>
      )}
    </Container>
  );
};

export default Quiz;
