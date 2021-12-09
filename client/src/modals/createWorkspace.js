/* eslint-disable */
import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
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
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите название workspace"/>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
            </FloatingLabel>
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
