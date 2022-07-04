import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useStateContext } from "./StateContext";

const EmailModal = (props) => {
  const [email, setEmail] = useState("");
  const { setUserEmail, setShowUserMailModal } = useStateContext();
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
            setUserEmail(email);
           
            setEmail("")
            setShowUserMailModal(false);
          }}
        >
          <InputGroup>
            <input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </InputGroup>
          <Button type="submit">Send mail</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;
