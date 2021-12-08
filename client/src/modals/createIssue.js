/* eslint-disable */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createIssue } from "../http/issueApi";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

const CreateIssue = observer(({show, onHide}) => {
  const [summary, setSummary] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const { id } = useParams();

  const addIssue = () => {
    console.log(summary, priority, status);
    createIssue(summary, priority, status, id).then(data => {
      setSummary('')
      setPriority('')
      setStatus('')
      onHide()
    });
    location.reload();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={summary} className="mt-3" onChange={(e) => setSummary(e.target.value)} placeholder="Введите summary"/>
          <Form.Control value={priority} className="mt-3" onChange={(e) => setPriority(e.target.value)} placeholder="Введите priority"/>
          <Form.Control value={status} className="mt-3" onChange={(e) => setStatus(e.target.value)} placeholder="Введите status"/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addIssue}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateIssue;