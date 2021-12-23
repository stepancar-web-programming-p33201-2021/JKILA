/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Container, Row, ToggleButton,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import { Context } from '../index';

import { fetchOneProject } from '../http/projectApi';
import { fetchIssues, updateIssue } from '../http/issueApi';
import { fetchTags } from '../http/tagApi';
import { fetchUsersByWs } from '../http/userAPI';
import CreateIssue from '../modals/createIssue';
import IssueColumn from '../components/IssueColumn';

const Issues = observer(() => {
  const { project, user } = useContext(Context);
  const { id } = useParams();
  const [issueVisible, setIssueVisible] = useState(false);

  const [active, setActive] = useState(null);

  useEffect(() => {
    fetchOneProject(id).then((data) => {
      project.setProject(data);
      fetchUsersByWs(data.ws_id).then((data1) => project.setUsers(data1));
    });
    fetchIssues(id, null).then((data) => project.setIssues(data));
    fetchTags(id).then((data) => project.setTags(data));
    project.setMyFilter(null);
  }, []);

  useEffect(() => {
    fetchIssues(id, project.myFilter).then((data) => project.setIssues(data));
    console.log(project.myFilter);
  }, [project.myFilter]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    const issue = project.issues.find((iss) => iss.id === draggableId);

    if (destination.droppableId !== source.droppableId) {
      issue.status = destination.droppableId;
      updateIssue(draggableId, destination.droppableId)
        .then(() => { });
    }
  };

  const addFilter = (filter) => {
    project.setMyFilter(filter);
    setActive(filter);
    if (active === filter){
      project.setMyFilter(null);
      setActive(null);
    }
  };

  return (
    <div>
      <Container className="p-3">
        <h3>Filters</h3>
        {project.users.map((user) =>
          <ToggleButton
            className="me-md-3"
            variant="secondary"
            value={user.id}
            active={user.id === active}
            onClick={() => addFilter(user.id)}
          >
            {user.username}
          </ToggleButton>)}
        <Button variant="secondary"
                value={user.user.id}
                active={user.user.id === active}
                onClick={() => addFilter(user.user.id)}
        >
          Only My Issues
        </Button>
      </Container>
      <Container className="p-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <IssueColumn status="To Do" />
            <IssueColumn status="In Progress" />
            <IssueColumn status="Done" />
          </Row>
        </DragDropContext>
      </Container>
      <Container className="d-flex flex-column">
        <Button variant="outline-primary" onClick={() => setIssueVisible(true)}>
          Create Issue
        </Button>
        <CreateIssue show={issueVisible} onHide={() => setIssueVisible(false)} />
      </Container>
    </div>
  );
});

export default Issues;
