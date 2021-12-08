/* eslint-disable */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createWorkspace } from "../http/workspaceApi";
import { observer } from 'mobx-react-lite';

const CreateWorkspace = observer(({show, onHide}) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const addWorkspace = () => {
    console.log(name, desc);
    createWorkspace(name,desc).then(data => {
      setName('')
      setDesc('')
      onHide()
    });
    location.reload();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Workspace
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите название workspace"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addWorkspace}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateWorkspace;
