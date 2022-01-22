/* eslint-disable */
import React, { useContext, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { createProject, fetchProjects } from '../http/projectApi';
import { Context } from '../index';

const CreateProject = observer(({ show, onHide }) => {
  const { project } = useContext(Context);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const { id } = useParams();

  const addProject = () => {
    console.log(name);
    createProject(name, id, desc).then((data) => {
      setName('');
      setDesc('');
      fetchProjects(id).then((data) => project.setProjects(data));
      onHide();
    });
  };

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
              <Form.Control required value={name} onChange={(e) => setName(e.target.value)} placeholder="Project" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
            </FloatingLabel>
          </Form.Group>
          <Button variant="outline-success" onClick={addProject} type="submit">Добавить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default CreateProject;
