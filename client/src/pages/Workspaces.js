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
        {user.user.role === 'ADMIN'
          ? (
            <Button variant="outline-info" onClick={() => setWorkspaceVisible(true)} className="mb-3">
              Create Workspace
            </Button>
          )
          // eslint-disable-next-line react/jsx-no-useless-fragment
          : <></>}
        <Button variant="outline-warning" onClick={() => setJoinVisible(true)} className="mb-3">
          Join workspace
        </Button>
        <CreateWorkspace show={workspaceVisible} onHide={() => setWorkspaceVisible(false)} />
        <JoinWorkspace show={joinVisible} onHide={() => setJoinVisible(false)} />
      </Container>
    </div>
  );
});

export default Workspaces;
