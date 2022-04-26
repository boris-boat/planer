import React, { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";

const Quote = () => {
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
    <div className="mt-2">
      <h3>Quote of the day : </h3>
      {quote ? (
        <h2>
          {quote.content} {quote.author}{" "}
        </h2>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};
export default Quote;
