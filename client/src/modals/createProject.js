/* eslint-disable */
import React, { useState } from 'react';
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap';
import { createProject } from "../http/projectApi";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

const CreateProject = observer(({show, onHide}) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const { id } = useParams();

  const addProject = () => {
    console.log(name);
    createProject(name, id, desc).then(data => {
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
          New project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingName" label="Project name">
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Project" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProject}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProject;
