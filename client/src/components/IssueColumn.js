/* eslint-disable */
import React, { useContext } from 'react';
import { Col, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';

import { Context } from '../index';

import IssueItem from './IssueItem';

const IssueColumn = observer((status) => {
  const { project } = useContext(Context);
  const issuesList = project.issues
    .filter((iss) => iss.status === JSON.parse(JSON.stringify(status)).status)
    .map((iss, index) => <IssueItem key={iss.id} issue={iss} index={index} />)

  return (
    <Droppable droppableId={JSON.parse(JSON.stringify(status)).status}>
    {provided => (
      <Col {...provided.droppableProps}
           ref={provided.innerRef}>
        <Container>
          <div>{JSON.parse(JSON.stringify(status)).status}</div>
              <div>
                {issuesList}
                {provided.placeholder}
              </div>
        </Container>
      </Col>
    )}
  </Droppable>
  );
});

export default IssueColumn;
