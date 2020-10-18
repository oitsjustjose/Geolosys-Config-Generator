import React from 'react';
import { Modal } from 'react-bootstrap';

export default ({
  title, contents, show, onHide,
}) => (
  <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Header closeButton>
      <Modal.Title className="text-center">
        {title}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {contents}
    </Modal.Body>
  </Modal>
);
