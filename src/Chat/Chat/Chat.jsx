import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import io from "socket.io-client";
import {  useLocation, useNavigate } from "react-router-dom";
import TextContainer from "../components/TextContainer/TextContainer";
import Messages from "../components/Messages/Messages";
import InfoBar from "../components/InfoBar/InfoBar";
import Input from "../components/Input/Input";
import { Button } from "react-bootstrap";
let socket;

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "https://boris-chatapp.herokuapp.com/";

  let name = localStorage.getItem("user")?.split(" ")[0];
  useEffect(() => {
    const { room } = queryString.parse(location.search);
    setRoom(room);
    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="mt-5">
      {name ? (
        <div className="outerContainer">
          <div className="chatContainer">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <TextContainer users={users} />
        </div>
          
      ) : ( <div className="App">
      <h1 className="mt-5">Please create an account or login !</h1>
      <Button variant="primary" onClick={() => navigate("/")}>
        Back
      </Button>
    </div>)}
    </div>
  );
};

export default Chat;
