import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useStateContext } from "./StateContext";
import "../App.css";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
const AccountInfoModal = (props) => {
  const [showEditMailInput, setShowEditMailInput] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const { REACT_APP_API_URL } = process.env;
  const { fullUserInfo, setFullUserInfo, notify } = useStateContext();
  let user = fullUserInfo?.data?.username;

  const editUserEmailDB = async () => {
    try {
      await fetch(REACT_APP_API_URL + "/user/updateUserEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          email: updatedEmail,
        }),
      }).then((response) => {
        if (response) {
          notify("Email updated");
          setFullUserInfo((prev) => ({ ...prev, email: updatedEmail }));
        } else {
          notify("Database error , try again later");
        }
        setUpdatedEmail("");
      });
    } catch (e) {
      console.log("error");
    }
  };
  let Info = () => {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Email is used in Expense Tracker part of the website!
      </Tooltip>
    );
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <p style={{marginLeft : "10px"}} className="questionMark">
          <AiOutlineQuestionCircle />
        </p>
      </OverlayTrigger>
    );
  };
  return (
    <Modal
      {...props}
      size="md"
      style={{ display: "flex", flexDirection: "column" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <ModalBody className="accInfoModal">
          <div>
            <h4>Account info :</h4>
          </div>
          <div style={{ marginBottom: "5px",marginTop : "20px" }}>
            <h5>Username : {user}</h5>
          </div>
          <div className="email">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
               
              }}
            >
              <h5 style={{display : "flex",margin : "0",alignItems : "center"}}>
                Email : {fullUserInfo?.data?.email}
                <Info/>
              </h5>
              <Button onClick={() => setShowEditMailInput(true)}>Edit</Button>
             
            </div>
            {showEditMailInput && (
              <div>
                <p>Enter new email address : </p>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                ></input>
                <button
                  onClick={() => {
                    editUserEmailDB();
                    setShowEditMailInput(false);
                  }}
                >
                  Enter
                </button>
                <AiOutlineClose
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => setShowEditMailInput(false)}
                />
              </div>
            )}
          </div>
          <div></div>
        </ModalBody>
      </Modal.Header>
    </Modal>
  );
};

export default AccountInfoModal;
