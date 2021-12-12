/* eslint-disable */
import React, {useContext, useState} from 'react';
import {Form, Modal, Row} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {fetchIssues, updateIssue} from '../http/issueApi';
import {Context} from "../index";
import {useParams} from "react-router-dom";

const Issue = observer(({ show, onHide, issue }) => {
  const { project } = useContext(Context);
  const [status, setStatus] = useState(issue.status);
  const [issueVisible, setIssueVisible] = useState(false);
  const { id } = useParams();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Form.Select className="me-3" style={{width:"auto"}}
                     onChange={(e) => {setStatus(e.target.value)
                                       updateIssue(issue.id, e.target.value).then
                                       (r => {fetchIssues(id).then((data) => project.setIssues(data));})
                                      }
                              }
                     defaultValue={status}>
          <option> To Do </option>
          <option> In Progress </option>
          <option> Done </option>
        </Form.Select>
        <h6> {issue.priority} </h6>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3"> {issue.summary} </h5>
        <h6> Description </h6>
        <p> {issue.description} </p>

      </Modal.Body>
    </Modal>
  );
});

export default Issue;
