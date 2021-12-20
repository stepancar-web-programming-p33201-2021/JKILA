/* eslint-disable */
import React, { useContext } from 'react';
import { Col, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';

import { Context } from '../index';

import IssueItem from './IssueItem';

const IssueColumn = observer((status) => {
  const { project } = useContext(Context);
  return (
    <Col>
      <Container>
        <div>{JSON.parse(JSON.stringify(status)).status}</div>
        <Droppable droppableId={JSON.stringify(status)}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {project.issues
                .filter((iss) => iss.status === JSON.parse(JSON.stringify(status)).status)
                .map((iss, index) => <IssueItem id={iss.id} key={iss.id} issue={iss} index={index} />)
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    </Col>
  );
});

export default IssueColumn;
