import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useStateContext } from "./StateContext";

const { REACT_APP_API_URL } = process.env;

const EmailModal = (props) => {
  const [emailModal, setEmailModal] = useState("");
  const { setShowUserMailModal, notify, setFullUserInfo } = useStateContext();
  let user = localStorage.getItem("user");

  const editUserEmailDB = async () => {
    try {
      // await fetch(REACT_APP_API_URL + "user/createUser", {
      await fetch(REACT_APP_API_URL + "/user/updateUserEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          email: emailModal,
        }),
      }).then((response) => {
        if (response) {
          notify("Email updated");
          setFullUserInfo((prev) => ({ ...prev, email: emailModal }));
        } else {
          notify("Database error , try again later");
        }
      });
    } catch (e) {
      console.log("error");
    }
  };
  //modal that asks user for their email to be sent with expenses
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please enter your email :
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            editUserEmailDB();

            setEmailModal("");
            setShowUserMailModal(false);
          }}
        >
          <InputGroup>
            <input
              placeholder="email"
              type="email"
              value={emailModal}
              onChange={(e) => setEmailModal(e.target.value)}
            ></input>
            <Button type="submit">Send mail</Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;
