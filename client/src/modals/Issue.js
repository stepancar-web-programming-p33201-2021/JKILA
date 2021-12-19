/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { useParams } from "react-router-dom";

import { fetchIssues, updateIssue } from '../http/issueApi';
import { fetchAssignees, fetchOneUser } from "../http/userAPI";
import { fetchIssueTags } from "../http/tagApi";

const Issue = observer(({ show, onHide, issue }) => {
  const { project } = useContext(Context);
  const [status, setStatus] = useState(issue.status);
  const [reporter, setReporter] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [tags, setTags] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchOneUser(issue.reporter_id).then((data) => setReporter(data));
    fetchAssignees(issue.id).then((data) => setAssignees(data));
    fetchIssueTags(issue.id).then((data) => setTags(data));
  }, []);

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
        <h6> Reporter </h6>
        <p> {reporter.username} </p>
        <h6> Due date </h6>
        <p> {issue.due_date} </p>
        <h6> Assignees </h6>
        {assignees.map((user) => <Button key={user.id}>{user.username}</Button>)}
        <h6> Tags </h6>
        {tags.map((tag) => <Button variant="warning" key={tag.id}>{tag.tag_name}</Button>)}
      </Modal.Body>
    </Modal>
  );
});

export default Issue;
