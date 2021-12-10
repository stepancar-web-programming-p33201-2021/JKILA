/* eslint-disable */
import React, {useContext, useState} from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { createWorkspace, joinWorkspace } from '../http/workspaceApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const CreateWorkspace = observer(({show, onHide}) => {
  const { user } = useContext(Context);

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [code, setCode] = useState('')

  const addWorkspace = () => {
    console.log(name, desc);
    createWorkspace(name,desc,code).then(data => {
    });
    joinWorkspace(user.user.id, code).then(data => {
      setName('')
      setDesc('')
      setCode('')
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
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingCode" label="Code for entering">
              <Form.Control value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code"/>
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
