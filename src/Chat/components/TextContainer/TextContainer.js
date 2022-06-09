import React from 'react';


import onlineIcon from '../icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>We value your privacy!</h1>
      <h2>What happens on imaSve, stays on imaSve</h2>
      
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently in this room :</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img src={onlineIcon} alt="Online Icon" />
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;