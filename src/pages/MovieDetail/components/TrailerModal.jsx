// TrailerModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const TrailerModal = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>예고편</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default TrailerModal;
