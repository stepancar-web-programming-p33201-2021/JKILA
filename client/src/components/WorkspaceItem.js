/* eslint-disable */
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PROJECTS } from '../utils/consts';

const WorkspaceItem = function ({ workspace }) {
  const history = useHistory();
  return (
    <Row style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '100%', cursor: 'pointer' }} className="mt-3 align-items-center" onClick={() => history.push(PROJECTS)}>
        <Card.Body>
          <Card.Title>
            {workspace.workspace_name}
          </Card.Title>
          <Card.Text>
            {workspace.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default WorkspaceItem;
