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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить workspace
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={name} className="mt-3" onChange={(e) => setName(e.target.value)} placeholder="Введите название workspace"/>
          <Form.Control value={desc} className="mt-3" onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addWorkspace}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateWorkspace;
