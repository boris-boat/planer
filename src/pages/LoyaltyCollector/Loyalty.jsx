import React, { useEffect, useState } from "react";
import Scanner from "../../components/Scanner/Scanner.js";
import { useStateContext } from "../../components/StateContext";
import "./Loyalty.styles.css";

const Loyalty = () => {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState("nothing so far");
  const onDetected = (result) => {
    setResult(result);
  };
  return (
    <div className="wholePage">
      <p>{result ? result : "Scanning..."}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? "Stop" : "Start"}
      </button>
      <div className="container">
        {camera && <Scanner onDetected={onDetected} />}
      </div>
      {result}
    </div>
  );
};

export default Loyalty;
