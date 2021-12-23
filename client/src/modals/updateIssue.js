/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { useParams } from 'react-router-dom';

import {fetchIssues, updateIssue} from '../http/issueApi';


const UpdateIssue = observer(({ show, onHide, issue }) => {
  const { project } = useContext(Context);
  const [summary, setSummary] = useState(issue.summary);
  const [desc, setDesc] = useState(issue.description);
  const [due, setDue] = useState(issue.due_date);
  const [priority, setPriority] = useState(issue.priority);
  const [status, setStatus] = useState(issue.status);

  const { id } = useParams();

  const editIssue = () => {
    updateIssue(issue.id, summary, due, status, priority, desc).then((data) => {
      setSummary('');
      setPriority('');
      setDesc('');
      setDue('')
      fetchIssues(id).then((data) => project.setIssues(data));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактировать issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
          <Form.Select className="me-3" onChange={(e) => setStatus(e.target.value)} defaultValue={status}>
            <option> To Do </option>
            <option> In Progress </option>
            <option> Done </option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Short summary">
              <Form.Control value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc}
                            onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Due date">
              <Form.Control type="date" value={due}
                            onChange={(e) => setDue(e.target.value)} placeholder="Due date"/>
            </FloatingLabel>
          </Form.Group>

          <FloatingLabel controlId="floatingSelect1" label="Priority">
            <Form.Select className="mt-2 mb-3" onChange={(e) => setPriority(e.target.value)} defaultValue={priority}>
              <option> Highest </option>
              <option> High </option>
              <option> Medium </option>
              <option> Low </option>
              <option> Lowest </option>
            </Form.Select>
          </FloatingLabel>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={editIssue}>Обновить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateIssue;
