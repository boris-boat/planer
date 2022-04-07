import React from "react";
import { useEffect, useState } from "react";

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
      <h2>
        {quote.content} {quote.author}
      </h2>
    </div>
  );
};
export default Quote;
