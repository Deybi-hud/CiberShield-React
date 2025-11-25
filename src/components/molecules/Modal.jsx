// src/components/molecules/Modal.js
import React from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import '../../styles/molecules/Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <Text as="h3" className="modal-title">{title}</Text>
          <Button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;