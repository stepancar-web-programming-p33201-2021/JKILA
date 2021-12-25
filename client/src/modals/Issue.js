/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import {Button, Card, Container, FloatingLabel, Form, Modal} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { useParams } from "react-router-dom";

import {fetchIssues, updateIssueStatus} from '../http/issueApi';
import { fetchAssignees, fetchOneUser } from "../http/userAPI";
import {fetchIssueTags} from "../http/tagApi";
import {createComment, fetchComments} from "../http/commentApi";
import UpdateIssue from "./updateIssue";
import Comment from "../components/Comment";

const Issue = observer(({ show, onHide, issue }) => {
  const { project, user } = useContext(Context);
  const [status, setStatus] = useState(issue.status);
  const [reporter, setReporter] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const [editVisible, setEditVisible] = useState(false);

  const { id } = useParams();
  const addComment = () => {
    createComment(body, user.user.id, issue.id).then((data) =>{
      setBody('');
      fetchComments(issue.id).then((data) => setComments(data));
    })
  }

  const commentEnter = (e) => {
    if (e.keyCode === 13){
      e.preventDefault();
      addComment();
    }
  }

  useEffect(() => {
    fetchOneUser(issue.reporter_id).then((data) => setReporter(data));
    fetchAssignees(issue.id).then((data) => setAssignees(data));
    fetchIssueTags(issue.id).then((data) => setTags(data));
    fetchComments(issue.id).then((data) => setComments(data));
  }, []);

  useEffect(() => {
    fetchComments(issue.id).then((data) => setComments(data));
  }, [project.reloadComments]);

  useEffect(() => {
    fetchAssignees(issue.id).then((data) => setAssignees(data));
  }, [project.reloadAssignees]);

  useEffect(() => {
    fetchIssueTags(issue.id).then((data) => setTags(data));
  }, [project.reloadTags]);


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Form.Select className="me-3" style={{width:"auto"}}
                     onChange={(e) => {setStatus(e.target.value)
                                       updateIssueStatus(issue.id, e.target.value).then
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
        <p>{assignees.map((user) => <Button key={user.id} active  className="me-md-2">{user.username}</Button>)}</p>
        <h6> Tags </h6>
        <p>{tags.map((tag) => <Button variant="warning" key={tag.id} active className="me-md-2">{tag.tag_name}</Button>)}</p>
        <Container className="d-flex flex-column mb-3">
          <Button variant="secondary" onClick={() => setEditVisible(true)}>
            update Issue
          </Button>
          <UpdateIssue show={editVisible} onHide={() => setEditVisible(false)} issue = {issue} />
        </Container>
        <Form className="mb-5">
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control value={body}
                            onChange={(e) => setBody(e.target.value)}
                            onKeyDown={(e) => commentEnter(e)} placeholder="Comment"/>
            </FloatingLabel>
          </Form.Group>
          <Button variant="outline-success" onClick={addComment}>Добавить</Button>
        </Form>
        {comments.map((comment) => <Comment comment={comment} />)}
      </Modal.Body>
    </Modal>
  );
});

export default Issue;
