import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import { fetchWorkspaces } from '../http/workspaceApi';
import CreateWorkspace from '../modals/createWorkspace';
import WorkspaceList from '../components/WorkspaceList';
import JoinWorkspace from '../modals/JoinWorkspace';

const Workspaces = observer(() => {
  const { user, workspace } = useContext(Context);
  const [workspaceVisible, setWorkspaceVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);

  useEffect(() => {
    fetchWorkspaces(user.user.id).then((data) => workspace.setWorkspaces(data));
  }, []);

  return (
    <div>
      <WorkspaceList />
      <Container className="d-flex flex-column my-2">
        <Button variant="outline-success" onClick={() => setWorkspaceVisible(true)}>
          Create Workspace
        </Button>
        <Button variant="outline-danger" onClick={() => setJoinVisible(true)}>
          Join workspace
        </Button>
        <CreateWorkspace show={workspaceVisible} onHide={() => setWorkspaceVisible(false)} />
        <JoinWorkspace show={joinVisible} onHide={() => setJoinVisible(false)} />
      </Container>
    </div>
  );
});

export default Workspaces;
