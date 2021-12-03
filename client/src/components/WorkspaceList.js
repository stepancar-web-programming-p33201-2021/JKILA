import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import WorkspaceItem from './WorkspaceItem';

const WorkspaceList = observer(() => {
  const { workspace } = useContext(Context);

  return (
    <Row className="d-flex ">
      {workspace.workspaces
        .map((work) => <WorkspaceItem key={work.id} workspace={work} />)}
    </Row>
  );
});

export default WorkspaceList;
