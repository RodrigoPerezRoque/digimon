import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del Digimon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
