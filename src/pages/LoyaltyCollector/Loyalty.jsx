import React, { useEffect, useState } from "react";
import Scanner from "../../components/Scanner/Scanner.js";
import Barcode from "react-barcode"
import "./Loyalty.styles.css";

const Loyalty = () => {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState("");
  const onDetected = (result) => {
    setResult(result);
  };
  return (
    <div className="wholePage">
      <p>{result ? result : "Scanning..."}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? "Stop" : "Start"}
      </button>
      <div className="container d-flex align-content-center justify-content-center align-items-center" style={{width :"100%"}}>
        {camera && <Scanner onDetected={onDetected} />}
      </div>
      <div><Barcode value={result}/></div>
    </div>
  );
};

export default Loyalty;
