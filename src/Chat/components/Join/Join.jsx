import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Join.css";

export default function SignIn() {
  const [room, setRoom] = useState("");

  return (
    <div className="mt-5" style={{ height: "100vh" }}>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Create or join a room</h1>

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
              Create/Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
