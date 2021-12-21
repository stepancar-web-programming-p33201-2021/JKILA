/* eslint-disable */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { observer } from 'mobx-react-lite';

import { Draggable } from 'react-beautiful-dnd';
import Issue from '../modals/Issue';

const IssueItem = observer(({ issue, index }) => {
  const [issueVisible, setIssueVisible] = useState(false);
  let color;
  switch (issue.priority) {
    case ('Highest'): color = 'danger';
      break;
    case ('High'): color = 'warning';
      break;
    case ('Medium'): color = 'primary';
      break;
    case ('Low'): color = 'info';
      break;
    case ('Lowest'): color = 'success';
      break;
    default: color = 'primary';
  }
  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided) => (
        <div
          style={{ paddingLeft: '10%', paddingRight: '10%' }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            style={{ width: '20rem', cursor: 'pointer' }}
            border={color}
            className="mt-3 align-items-center"
            onClick={() => setIssueVisible(true)}
          >
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
      )}
    </Draggable>
  );
});

export default IssueItem;
