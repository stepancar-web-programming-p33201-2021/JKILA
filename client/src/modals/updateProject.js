/* eslint-disable */
import React, { useContext, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {fetchProjects, updateProject} from '../http/projectApi';
import { Context } from '../index';

const UpdateProject = observer(({ show, onHide, project: proj }) => {
  const { project } = useContext(Context);
  const [name, setName] = useState(proj.proj_name);
  const [desc, setDesc] = useState(proj.description);

  const { id } = useParams();

  const editProject = () => {
    updateProject(proj.id, name, desc).then((data) => {
      fetchProjects(id).then((data) => project.setProjects(data));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit project
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
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={editProject}>Редактировать</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateProject;
