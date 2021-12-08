/* eslint-disable */
import React, { useState } from 'react';
import {Button, Dropdown, Form, Modal} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { createIssue } from '../http/issueApi';

const CreateIssue = observer(({ show, onHide }) => {
  const [summary, setSummary] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const { id } = useParams();

  const addIssue = () => {
    console.log(summary, priority, status);
    createIssue(summary, id, priority, status).then(data => {
      setSummary('');
      setPriority('');
      setStatus('');
      onHide();
    });
    location.reload();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control value={summary}  onChange={(e) => setSummary(e.target.value)} placeholder="Введите summary"/>
          </Form.Group>

          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Priority</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setPriority("Highest")}>Highest</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setPriority("High")}>High</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setPriority("Medium")}>Medium</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setPriority("Low")}>Low</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setPriority("Lowest")}>Lowest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control value={priority} placeholder="Выберите priority" className="mb-3" disabled/>

          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Status</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setStatus("To Do")}>To Do</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setStatus("In Progress")}>In Progress</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setStatus("Done")}>Done</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control value={status} placeholder="Выберите status" className="mb-3" disabled/>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addIssue}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateIssue;