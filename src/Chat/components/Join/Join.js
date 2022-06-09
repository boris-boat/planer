import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./Join.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [room, setRoom] = useState("");
  let user = localStorage.getItem("user")?.split(" ")[0];

  return (
    <div className="mt-5">
      {user ? ( <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Create a room</h1>

        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <Link
          onClick={(e) => (!room ? e.preventDefault() : null)}
          to={`/chat?room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Create
          </button>
        </Link>
      </div>
    </div>) : (<div className="App">
      <h1 className="mt-5">Please create an account or login !</h1>
      <Button variant="primary" onClick={() => navigate("/")}>
        Back
      </Button>
    </div>) }
     
    </div>
    
  );
}
