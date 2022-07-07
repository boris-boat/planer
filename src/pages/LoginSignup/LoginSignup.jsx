import React from "react";
import { Form, Button, Container, Col, Row, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../components/StateContext";
import "../../App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "../Home/Home";
const { REACT_APP_API_URL } = process.env;

const Login = () => {
  let user = localStorage.getItem("user")?.split(" ")[0];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  const navigate = useNavigate();

  const { notify } = useStateContext();
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
          notify("Username allready taken");
        } else {
          notify("Account created.");
          setNewUser(false);
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
          }
        });
    } catch (e) {
      notify("Invalid username/password combination");
      console.log(e);
    }
  };

  return (
    <Container fluid className="m-0">
      {!user ? (
        <Row style={{ margin: "0", padding: "0" }} className="lginPage">
          <Col sm={4} style={{ margin: "0", padding: "0" }}>
            <Col>
              <Col>
                <Row>
                  <Row className="m-0 p-0 ">
                    <Image
                      className="m-0 p-0"
                      src={require("../../components/media/logosiroki-removebg-preview.png")}
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
                        e.preventDefault();

                        loginUser();
                      }}
                    >
                      Login
                    </Button>
                    <div style={{ marginTop: "10px", display: "flex" }}>
                      <h5 style={{ marginRight: "10px" }}>
                        Dont have an account?{" "}
                      </h5>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setNewUser(true);
                        }}
                      >
                        Sign Up
                      </a>
                    </div>
                  </Form>
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
                      }}
                    >
                      Signup
                    </Button>

                    <div style={{ marginTop: "10px", display: "flex" }}>
                      <h5 style={{ marginRight: "10px" }}>
                        Allready a member?{" "}
                      </h5>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setNewUser(false);
                        }}
                      >
                        Login
                      </a>
                    </div>
                  </Form>

                  <br />
                </Col>
              )}

              <br />
            </Col>
          </Col>
          <Col className="m-0 p-0 d-flex align-content-center justify-content-center video loginVideo">
            <div>
              {" "}
              <video
                loop
                autoPlay
                mute="true"
                className="loginImg m-0 "
                style={{ height: "890px", width: "900px", borderRadius: "5px" }}
              >
                <source
                  src={require("../../components/media/Final-Shot.mp4")}
                  type="video/mp4"
                />
              </video>
            </div>
          </Col>
        </Row>
      ) : (
      <Home/>
      )}

      <ToastContainer position="bottom-left" />
    </Container>
  );
};
export default Login;
