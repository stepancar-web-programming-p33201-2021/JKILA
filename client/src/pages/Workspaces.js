import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import { fetchWorkspaces } from '../http/workspaceApi';
import CreateWorkspace from '../modals/createWorkspace';
import WorkspaceList from '../components/WorkspaceList';

const Workspaces = observer(() => {
  const { workspace } = useContext(Context);
  const [workspaceVisible, setWorkspaceVisible] = useState(false);

  useEffect(() => {
    fetchWorkspaces().then((data) => workspace.setWorkspaces(data));
  }, []);

  return (
    <div>
      <WorkspaceList />
      <Container className="d-flex flex-column">
        <Button variant="outline-danger" onClick={() => setWorkspaceVisible(true)}>
          Create Workspace
        </Button>
        <CreateWorkspace show={workspaceVisible} onHide={() => setWorkspaceVisible(false)} />
      </Container>
    </div>
  );
});

export default Workspaces;
