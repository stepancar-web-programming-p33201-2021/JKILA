import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Context } from '../index';

import { fetchIssues } from '../http/issueApi';
import CreateIssue from '../modals/createIssue';
import IssueColumn from '../components/IssueColumn';

const Issues = observer(() => {
  const { project } = useContext(Context);
  const { id } = useParams();
  const [issueVisible, setIssueVisible] = useState(false);

  useEffect(() => {
    fetchIssues(id).then((data) => project.setIssues(data));
  }, []);

  return (
    <div>
      <IssueColumn />
      <Container className="d-flex flex-column">
        <Button variant="outline-danger" onClick={() => setIssueVisible(true)}>
          Create Issue
        </Button>
        <CreateIssue show={issueVisible} onHide={() => setIssueVisible(false)} />
      </Container>
    </div>
  );
});

export default Issues;
