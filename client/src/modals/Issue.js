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
        <Modal.Title id="contained-modal-title-vcenter">
          {issue.summary}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>
            {issue.summary}
          </p>
          <p>
            {issue.priority}
          </p>
          <p>
            {issue.status}
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default Issue;
