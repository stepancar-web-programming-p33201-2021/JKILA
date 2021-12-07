import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import IssueItem from './IssueItem';

const IssueColumn = observer(() => {
  const { project } = useContext(Context);

  return (
    <Row className="d-flex ">
      {project.issues
        .map((iss) => <IssueItem key={iss.id} issue={iss} />)}
    </Row>
  );
});

export default IssueColumn;
