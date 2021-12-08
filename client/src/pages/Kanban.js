import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Context } from '../index';

import { fetchIssues } from '../http/issueApi';
import CreateIssue from '../modals/createIssue';
import IssueColumn from '../components/IssueColumn';
// import Issue from './Issue';

const Issues = observer(() => {
  const { project } = useContext(Context);
  const { id } = useParams();
  // const match = useRouteMatch();
  const [issueVisible, setIssueVisible] = useState(false);

  useEffect(() => {
    fetchIssues(id).then((data) => project.setIssues(data));
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Row>
          <Col>
            <IssueColumn status="To Do" />
          </Col>
          <Col>
            <IssueColumn status="In Progress" />
          </Col>
          <Col>
            <IssueColumn status="Done" />
          </Col>
        </Row>
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
