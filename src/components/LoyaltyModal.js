import React from "react";
import {Modal } from "react-bootstrap";
import Barcode from "react-barcode";
import "../pages/LoyaltyCollector/Loyalty.styles.css";

const LoyaltyModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="barkod" >
        <Barcode value={props.number}  width="5" height="220"/>
      </Modal.Body>
    </Modal>
  );
};

export default LoyaltyModal;
