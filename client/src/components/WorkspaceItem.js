/* eslint-disable */
import React, {useContext, useState} from 'react';
import {Button, Card, Container, Row} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PROJECTS } from "../utils/consts";
import {observer} from "mobx-react-lite";
import UpdateWorkspace from "../modals/updateWorkspace";
import {Context} from "../index";

const WorkspaceItem = observer(({workspace}) => {
  const history = useHistory();

  const { user } = useContext(Context);

  const [editVisible, setEditVisible] = useState(false);
  return (
    <Row style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '100%', cursor: 'pointer' }} className="mt-3 align-items-center mb-3">
        <Card.Body onClick={() => history.push(PROJECTS + '/' + workspace.id)}>
          <Card.Title>
            {workspace.workspace_name}
          </Card.Title>
          <Card.Text>
            <p>
              {workspace.description}
            </p>
            <p>
              Code: {workspace.code}
            </p>
          </Card.Text>
        </Card.Body>
        <Container className="d-flex flex-column">
          {user.user.role === 'ADMIN'
            ? (
              <Button variant="outline-primary" onClick={() => setEditVisible(true)} className="mb-3" >
                edit workspace
              </Button>
            )
            // eslint-disable-next-line react/jsx-no-useless-fragment
            : <></>}
          <UpdateWorkspace show={editVisible} onHide={() => setEditVisible(false)} workspace={workspace} />
        </Container>
      </Card>
    </Row>
  );
});

export default WorkspaceItem;
