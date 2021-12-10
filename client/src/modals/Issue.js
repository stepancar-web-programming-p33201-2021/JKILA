/* eslint-disable */
import React, { useState } from 'react';
import {Form, Modal, Row} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { updateIssue } from '../http/issueApi';

const Issue = observer(({ show, onHide, issue }) => {
  const [status, setStatus] = useState(issue.status);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Form.Select className="me-3" style={{width:"auto"}}
                     onChange={(e) => {setStatus(e.target.value)
                                       updateIssue(issue.id, e.target.value).then(r => {location.reload()})}}>
          <option selected={status === "To Do"}> To Do </option>
          <option selected={status === "In Progress"}> In Progress </option>
          <option selected={status === "Done"}> Done </option>
        </Form.Select>
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
