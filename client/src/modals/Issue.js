/* eslint-disable */
import React, { useState } from 'react';
import {Form, Modal, Row} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const Issue = observer(({ show, onHide, issue }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState('');
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <h6 className="me-md-4"> {issue.status} </h6>
        <h6> {issue.priority} </h6>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3"> {issue.summary} </h5>
        <h6> Description </h6>
        <p> {issue.description} </p>

      </Modal.Body>
    </Modal>
  );
});

export default Issue;
