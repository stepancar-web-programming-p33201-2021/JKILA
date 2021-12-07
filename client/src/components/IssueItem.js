/* eslint-disable */
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ISSUE } from '../utils/consts';
import {observer} from "mobx-react-lite";

const IssueItem = observer(({issue}) => {
  const history = useHistory();
  return (
    <Row style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '100%', cursor: 'pointer' }} className="mt-3 align-items-center" onClick={() => history.push(ISSUE)}>
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
    </Row>
  );
});

export default IssueItem;
