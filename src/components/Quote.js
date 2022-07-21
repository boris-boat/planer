import React, { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";

const Quote = () => {
  //quote of the day for todo app
  const [quote, setQuote] = useState("");
  const updateQuote = async () => {
    const response = await fetch("https://api.quotable.io/random?maxLength=50");
    const { ...data } = await response.json();
    setQuote(data);
  };

  useEffect(() => {
    updateQuote();
  }, []);

  return (
    <div style={{ paddingTop: "70px", paddingLeft: "0", paddingRight: "0" }}>
      <h3 style={{ color: "white" }}>Quote of the day : </h3>
      {quote ? (
        <>
          <h2 style={{ color: "white", marginLeft: "5px", marginRight: "5px" }}>
            {quote.content}
          </h2>
          <h2 style={{color : "white"}}>{quote.author}</h2>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};
export default Quote;
