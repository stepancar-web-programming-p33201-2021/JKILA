/* eslint-disable */
import React, {useState} from 'react';
import { Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ISSUE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import CreateProject from "../modals/createProject";
import Issue from "../modals/Issue";

const IssueItem = observer(({issue}) => {
  const [issueVisible, setIssueVisible] = useState(false);
  let color
  switch (issue.priority) {
    case('Highest'): color = "danger";
      break;
    case('High'): color = "warning";
      break;
    case('Medium'): color = "primary";
      break;
    case('Low'): color = "info";
      break;
    case('Lowest'): color = "success";
      break;
  }
  return (
    <div style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '20rem', cursor: 'pointer' }} border={color} className="mt-3 align-items-center" onClick={() => setIssueVisible(true)}>
        <Card.Body>
          <Card.Title>
            {issue.summary}
          </Card.Title>
          <Card.Title>
            {issue.status}
          </Card.Title>
          <Card.Title>
            {issue.priority}
          </Card.Title>
        </Card.Body>
      </Card>
      <Issue show={issueVisible} onHide={() => setIssueVisible(false)} issue={issue} />
    </div>
  );
});

export default IssueItem;
