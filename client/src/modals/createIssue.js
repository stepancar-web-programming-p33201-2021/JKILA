/* eslint-disable */
import React, { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { createIssue } from '../http/issueApi';

const CreateIssue = observer(({ show, onHide }) => {
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const { id } = useParams();

  const addIssue = () => {
    console.log(summary, priority, status);
    createIssue(summary, id, priority, status).then((data) => {
      setSummary('');
      setPriority('');
      setStatus('');
      onHide();
    });
    location.reload();
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Short summary">
              <Form.Control as="textarea" value={summary} style={{ height: '100px' }}
                          onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel controlId="floatingSelect1" label="Priority">
            <Form.Select className="mt-2 mb-3" onChange={(e) => setPriority(e.target.value)}>
              <option> Highest </option>
              <option> High </option>
              <option selected> Medium </option>
              <option> Low </option>
              <option> Lowest </option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect2" label="Status">
            <Form.Select className="mt-2 mb-3" onChange={(e) => setStatus(e.target.value)}>
              <option selected> To Do </option>
              <option> In Progress </option>
              <option> Done </option>
            </Form.Select>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addIssue}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateIssue;
