import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index';

const WorkspaceList = function () {
  const { workspace } = useContext(Context);

  return (
    <Row className="d-flex">
      {workspace.workspaces.map((device) => <WorkspaceItem key={device.id} device={device} />)}
    </Row>
  );
};

export default WorkspaceList;
