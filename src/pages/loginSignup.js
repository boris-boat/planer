import React from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Alert,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Home from "./Home";

const { REACT_APP_API_URL } = process.env;

const Login = () => {
  const [error, setError] = useState("");
  const [signupError, setSignuperror] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  const navigate = useNavigate();
  let user = localStorage.getItem("user")?.split(" ")[0];

  const addUser = async () => {
    try {
      await fetch(REACT_APP_API_URL + "/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPassword,
        }),
      }).then((response) => {
        if (response.status === 500) {
          setSignuperror("Username allready taken");
        } else {
          setSignuperror("Account created.");
        }
      });
    } catch (e) {
      console.log("error");
    }
  };
  const loginUser = async () => {
    try {
      await fetch(REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          if (data) {
            localStorage.setItem("user", username + " " + data.token);

            navigate("/home");
          } else {
            setError("Invalid username/password combination");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container fluid className="m-0 p-0">
      {user ? (
        <Home />
      ) : (
        <Row>
          <Col sm={4}>
            <Col>
              <Col>
                <Row>
                  <Row className="m-0 p-0 ">
                    <Image
                      className="m-0 p-0"
                      src={require("../components/media/logosiroki-removebg-preview.png")}
                    ></Image>
                  </Row>
                </Row>
              </Col>
              {newUser === false ? (
                <>
                  <h1 className="mt-3 px-4">LOGIN</h1>

                  <Form className="px-4 ">
                    <Form.Group
                      className="mb-3 expand-sm"
                      controlId="formBasicUsername"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        loginUser();
                        e.preventDefault();
                      }}
                    >
                      Login
                    </Button>
                    <div style={{ marginTop: "10px", display: "flex" }}>
                      <h4 style={{ marginRight: "10px" }}>
                        Dont have an account?{" "}
                      </h4>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setNewUser(true);
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  {signupError ? <Alert>{signupError}</Alert> : ""}
                  {error ? <Alert variant="danger">{error}</Alert> : ""}
                </>
              ) : (
                <Col>
                  <h1 className="mt-2 px-4">SIGNUP</h1>
                  <Form className="mt-2 px-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={signUpUsername}
                        onChange={(e) => setsignUpUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={signUpPassword}
                        onChange={(e) => setsignUpPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();

                        addUser();
                        setNewUser(false);
                      }}
                    >
                      Signup
                    </Button>

                    <div style={{ marginTop: "10px", display: "flex" }}>
                      <h4 style={{ marginRight: "10px" }}>
                        Allready a member?{" "}
                      </h4>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setNewUser(false);
                        }}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>

                  <br />
                  {signupError ? <Alert>{signupError}</Alert> : ""}
                </Col>
              )}

              <br />
            </Col>
          </Col>
          <Col className="m-0 p-0 d-flex align-content-center justify-content-center video loginVideo">
            <div >
              {" "}
              <video
                loop
                autoPlay
                className="loginImg m-0 "
                style={{ height: "890px", width: "900px", borderRadius: "5px" }}
              >
                <source
                  src={require("../components/media/Final-Shot.mp4")}
                  type="video/mp4"
                />
              </video>
            </div>

            {/* <Image 
              className="loginImg m-0 "
              style={{ height: "890px", width: "900px" }}
              src={require("../components/login-removebg-preview.png")}
              alt=""
              responsive
            /> */}
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Login;
