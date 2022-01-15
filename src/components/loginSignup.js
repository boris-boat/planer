import React from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

const Login = () => {
  const navigate = useNavigate();
  const API_LOKACIJA = REACT_APP_API_URL;

  const addUser = async () => {
    try {
      await fetch(API_LOKACIJA + "/createUser", {
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
      await fetch(API_LOKACIJA + "/login", {
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
  const [error, setError] = useState("");
  const [signupError, setSignuperror] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");

  useEffect(() => {}, []);
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Col>
            <h1 className="mt-5">LOGIN</h1>

            <Form className="mt-5">
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
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
            {error}
          </Col>

          <Col>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h1>OR</h1>
            </div>
          </Col>
          <Col>
            <h1 className="mt-5">SIGNUP</h1>

            <Form className="mt-5">
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
            {signupError}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
