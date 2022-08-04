import React, { useEffect, useState } from "react";
import "./Loyalty.styles.css";
import Barcode from "react-barcode";
import { useStateContext } from "../../components/StateContext";
const Loyalty = () => {
  const { fullUserInfo } =
    useStateContext();
    console.log(fullUserInfo)
  const { REACT_APP_API_URL } = process.env;
  const [number, setNumber] = useState("");
  const [barcodeNumbers, setBarcodeNumbers] = useState("");
  const fetchNumbers = () => {
    fetch(REACT_APP_API_URL + "/loyalty/getNumbers/noske")
      .then((res) => res.json())
      .then((result) => setBarcodeNumbers(result.loyaltyCards));
  };
  const addNumber = async () => {
    await fetch(REACT_APP_API_URL + "/loyalty/addNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "noske",
        number: number,
      }),
    })
      .then((res) => res.json())
      .then((result) => setBarcodeNumbers(result.loyaltyCards))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchNumbers();
  }, []);

  return (
    <div className="pageWrapper">
      <div className="appWrapper">
        <div className="inputWrapper">
          <div className="inputItemsContainer">
            <input
              placeholder="Please enter number under barcode"
              style={{ width: "80%" }}
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                addNumber();
                setNumber("");
              }}
            >
              Add
            </button>
          </div>
        </div>

        {barcodeNumbers
          ? barcodeNumbers.map((num) => {
              return (
                <div className="singleItem" key={num}>
                  <Barcode value={num} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Loyalty;
