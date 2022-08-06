import React, { useEffect, useState } from "react";
import "./Loyalty.styles.css";
import Barcode from "react-barcode";
import { useStateContext } from "../../components/StateContext";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import LoyaltyModal from "../../components/LoyaltyModal";
import { Button } from "react-bootstrap";
const Loyalty = () => {
  const { fullUserInfo } = useStateContext();
  const { REACT_APP_API_URL } = process.env;
  const [desc, setDesc] = useState("");
  const [modalNumber, setModalNumber] = useState("");
  const [number, setNumber] = useState("");
  const [barcodeNumbers, setBarcodeNumbers] = useState("");
  const [modalShow, setModalShow] = useState(false);
 //fetching data from backend
  const fetchNumbers = async () => {
    fetch(
      REACT_APP_API_URL + "/loyalty/getNumbers/" + fullUserInfo.data.username
    )
      .then((res) => res.json())
      .then((result) => setBarcodeNumbers(result.loyaltyCards));
  };

  const addNumber = async () => {
    try {
      if (number.length > 3) {
        await fetch(REACT_APP_API_URL + "/loyalty/addNumber", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: fullUserInfo.data.username,
            desc: desc,
            number: number,
          }),
        })
          .then((res) => res.json())
          .then(() => fetchNumbers())
          .catch((e) => console.log(e));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNumber = async (value) => {
    let temp = barcodeNumbers;
    let tempBarcode = temp.filter((item) => item.number !== value);
    setBarcodeNumbers(tempBarcode);
    fetch(REACT_APP_API_URL + "/loyalty/deleteNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: fullUserInfo.data.username,
        number: value,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchNumbers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="pageWrapper">
      <div className="titleWrapper">
        <h2>
          Keep your wallet thin by not carrying all those loyalty cards arround.
        </h2>
      </div>
      <div className="appWrapper">
        <LoyaltyModal
          backdropClassName={"loyaltyModal"}
          show={modalShow}
          onHide={() => setModalShow(false)}
          number={modalNumber}
        />
        <div className="inputWrapper">
          <div className="inputItemsContainer">
            <input
              placeholder="Description"
              style={{ width: "30%", borderRadius: "5px" }}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></input>
            <input
              placeholder="Barcode number"
              style={{ width: "35%", borderRadius: "5px" }}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              value={number}
            ></input>

            <Button
              variant="primary"
              style={{ borderRadius: "40px" }}
              onClick={(e) => {
                e.preventDefault();
                addNumber();
                setNumber("");
                setDesc("");
              }}
            >
              <RiAddCircleFill
                style={{
                  height: "20px",
                  width: "18px",
                  marginBottom: "3px",
                }}
              />
            </Button>
          </div>
        </div>

        {barcodeNumbers
          ? barcodeNumbers.map((item) => {
              return (
                <div className="singleItem" key={Math.random()}>
                  <div
                    className="left"
                    onClick={() => {
                      setModalNumber(item.number);
                      setModalShow(true);
                    }}
                  >
                    <h3 style={{ color: "white" }}>{item.desc}</h3>
                    <Barcode value={item.number} />
                  </div>

                  <Button
                    variant="danger"
                    style={{ borderRadius: "40px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteNumber(item.number);
                    }}
                  >
                    <RiDeleteBin6Line
                      style={{
                        height: "20px",
                        width: "18px",
                        marginBottom: "3px",
                      }}
                    />
                  </Button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Loyalty;
