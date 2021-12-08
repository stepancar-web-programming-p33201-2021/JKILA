/* eslint-disable */
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createProject } from "../http/projectApi";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

const CreateProject = observer(({show, onHide}) => {
  const [name, setName] = useState('')
  const { id } = useParams();

  const addProject = () => {
    console.log(name);
    createProject(name, id).then(data => {
      setName('')
      onHide()
    });
    location.reload();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={name} className="mt-3" onChange={(e) => setName(e.target.value)} placeholder="Введите название project"/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProject}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProject;
