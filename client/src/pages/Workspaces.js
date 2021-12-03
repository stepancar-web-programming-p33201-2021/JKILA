import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
// import {WORKSPACES} from "../utils/consts";
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import { fetchWorkspaces } from '../http/workspaceApi';
import CreateWorkspace from '../modals/createWorkspace';

const Workspaces = observer(() => {
  const { workspace } = useContext(Context);
  const [workspaceVisible, setWorkspaceVisible] = useState(false);

  useEffect(() => {
    fetchWorkspaces().then((data) => workspace.setWorkspaces(data));
  }, []);

  return (
    <div>
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
