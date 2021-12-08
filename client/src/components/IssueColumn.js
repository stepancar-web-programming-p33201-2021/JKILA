/* eslint-disable */
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import IssueItem from './IssueItem';

const IssueColumn = observer((status) => {
  const { project } = useContext(Context);
  return (
    <Container>
      { project.issues.filter((iss) => iss.status === JSON.parse(JSON.stringify(status)).status)
        .map((iss) => <IssueItem key={iss.id} issue={iss} />)}
    </Container>
  );
});

export default IssueColumn;
