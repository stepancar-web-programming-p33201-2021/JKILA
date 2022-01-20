/* eslint-disable */
import React, {useContext, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {fetchWorkspaces, joinWorkspace} from '../http/workspaceApi';
import { Context } from '../index';

const JoinWorkspace = observer(({show, onHide}) => {
  const { user, workspace } = useContext(Context);
  const [code, setCode] = useState('')

  const joinWorkspaceButton = () => {
    console.log(user.user.id);
    joinWorkspace(user.user.id, code).then(data => {
      setCode('')
      fetchWorkspaces(user.user.id).then((data) => workspace.setWorkspaces(data));
      onHide()
    });
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Joining workspace
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel controlId="floatingCode" label="Code for entering">
            <Form.Control value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code"/>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={joinWorkspaceButton}>Вступить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default JoinWorkspace;
