/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { useParams } from 'react-router-dom';

import { addIssueAssignee, addIssueTag, createIssue, fetchIssues } from '../http/issueApi';
import { createTag, fetchTags } from '../http/tagApi';

const CreateIssue = observer(({ show, onHide }) => {
  const { project, user } = useContext(Context);
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [desc, setDesc] = useState('');
  const [reporter, setReporter] = useState(user.user.id);
  const [assignees, setAssignees] = useState([]);
  const [tags, setTags] = useState([]);

  const [tagInput, setTagInput] = useState(false);
  const [tagName, setTagName] = useState('');

  const { id } = useParams();

  const addAssignee = (username) => {
    setAssignees([...assignees, username])
  }

  const removeAssignee = (user) => {
    setAssignees(assignees.filter(i => i !== user))
  }

  const addTagIssue = (name) => {
    setTags([...tags, name])
  }

  const removeTagIssue = (name) => {
    setTags(tags.filter(i => i !== name))
  }

  const addTag = () => {
    createTag(tagName, id).then(() =>{
     setTagInput(false);
     setTagName('');
     fetchTags(id).then((data) => project.setTags(data));
    })
  }

  const addIssue = () => {
    console.log(summary, priority, status);
    createIssue(summary, id, priority, status, desc, reporter).then((data) => {
      setSummary('');
      setPriority('Medium');
      setDesc('');
      setReporter(user.user.id);
      assignees.forEach((item) =>{
        addIssueAssignee(item, data.id).then(r => {});
      })
      setAssignees([]);
      tags.forEach((item) =>{
        addIssueTag(item, data.id).then(r => {});
      })
      setTags([]);
      fetchIssues(id).then((data) => project.setIssues(data));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea" label="Short summary">
              <Form.Control value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control as="textarea" style={{ height: '100px' }} value={desc}
                            onChange={(e) => setDesc(e.target.value)} placeholder="Description"/>
            </FloatingLabel>
          </Form.Group>

          <FloatingLabel controlId="floatingSelect1" label="Priority">
            <Form.Select className="mt-2 mb-3" onChange={(e) => setPriority(e.target.value)} defaultValue="Medium">
              <option> Highest </option>
              <option> High </option>
              <option> Medium </option>
              <option> Low </option>
              <option> Lowest </option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect2" label="Reporter">
            <Form.Select className="mt-2 mb-3" onChange={(e) => {setReporter(e.target.value);
                                                        console.log(reporter)}}>
              {project.users
                .map((user) => <option hidden={user.id === reporter} key={user.id} value={user.id}>{user.username}</option>)}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect3" label="Assignees">
            <Form.Select className="mt-2 mb-3" onChange={(e) => {addAssignee(e.target.value)}}>
              {project.users
                .map((user) =>
                  <option
                    hidden={assignees.includes(user.username)}
                    key={user.id}
                    value={user.username}
                  >{user.username}
                  </option>)}
            </Form.Select>
          </FloatingLabel>

          {assignees.map((user) => <Button onClick={() => removeAssignee(user)}> {user} </Button>)}

          <FloatingLabel controlId="floatingSelect4" label="Tags" className="my-3">
            <Form.Select onChange={(e) => {addTagIssue(e.target.value)}}>
              {project.tags
                .map((tag) =>
                  <option
                    hidden={tags.includes(tag.tag_name)}
                    key={tag.id}
                    value={tag.tag_name}
                  >{tag.tag_name}
                  </option>)}
            </Form.Select>
          </FloatingLabel>

          {tags.map((tag) => <Button onClick={() => removeTagIssue(tag)}> {tag} </Button>)}

          <Button variant="success" className="my-2" onClick={() => {
            if (tagInput){
              if (tagName !== '') {
                addTag();
                document.getElementById('tagCr').value = '';
              }
              setTagInput(false);
              document.getElementById('tagCr').style.display ='none';
            } else {
              setTagInput(true);
              document.getElementById('tagCr').style.display = 'block';
            }
          }}>+ Create tag</Button>
          <input id="tagCr" className="form-control" type="text" style={{display: 'none'}}
                 onChange={(e) => setTagName(e.target.value)}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addIssue}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateIssue;
