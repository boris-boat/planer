import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  let user = localStorage.getItem("user")?.split(" ")[0];
  console.log(name)
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => {
            setName(user)
            setRoom(event.target.value)}} />
        </div>
        <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
