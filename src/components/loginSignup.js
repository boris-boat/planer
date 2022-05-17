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

import App from "../App";

const { REACT_APP_API_URL } = process.env;

const Login = () => {
  const [error, setError] = useState("");
  const [signupError, setSignuperror] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");

  const navigate = useNavigate();
  let user = localStorage.getItem("user");
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
      }).then((response) => {
        if (response.ok) {
          localStorage.setItem("user", username);

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
        <App />
      ) : (
        <Row>
          <Col sm={4}>
            <Col>
              <Col>
                <Row>
                  <Row className="m-0 p-0">
                    <Image
                      className="m-0 p-0"
                      src={require("./logosiroki.png")}
                    ></Image>
                  </Row>
                  <Row className="d-flex align-items-end m-0">
                    <h1 className="mt-3 px-4">LOGIN</h1>
                  </Row>
                </Row>
              </Col>
              <Form className="mt-3 px-4 ">
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
              </Form>
              <br />
              {error ? <Alert variant="danger">{error}</Alert> : ""}
            </Col>

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
                  }}
                >
                  Signup
                </Button>
              </Form>
              <br />
              {signupError ? <Alert>{signupError}</Alert> : ""}
            </Col>
          </Col>
          <Col className="m-0 p-0">
            <Image
              className="loginImg m-0 "
              style={{ height: "100%", width: "100%" }}
              src={require("./unsplash.jpg")}
              alt=""
              responsive
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Login;
