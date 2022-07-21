import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { useStateContext } from "./StateContext";
import { AiOutlineClose } from "react-icons/ai";
const AccountInfoModal = (props) => {
  const [showEditMailInput, setShowEditMailInput] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const { REACT_APP_API_URL } = process.env;

  const { fullUserInfo, setFullUserInfo, notify } = useStateContext();
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
  let user = localStorage.getItem("user");

  return (
    <Modal
      {...props}
      size="md"
      style={{ display: "flex", flexDirection: "column" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <ModalBody>
          <div>
            <h4>Account info :</h4>
          </div>
          <div style={{ marginBottom: "5px" }}>
            <h5>Username : {user}</h5>
          </div>
          <div>
            <h5 style={{ display: "flex", justifyContent: "space-between",alignItems : "center" }}>
              Email : {fullUserInfo?.email}{" "}
              <Button onClick={() => setShowEditMailInput(true)}>
                Edit Email
              </Button>
            </h5>
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
                  style={{ marginLeft: "10px",cursor : "pointer" }}
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
