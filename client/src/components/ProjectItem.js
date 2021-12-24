/* eslint-disable */
import React, {useContext, useState} from 'react';
import {Button, Card, Container, Row} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BOARD } from '../utils/consts';
import {observer} from "mobx-react-lite";
import UpdateProject from "../modals/updateProject";
import {Context} from "../index";

const ProjectItem = observer(({project}) => {
  const history = useHistory();

  const { user } = useContext(Context);

  const [editVisible, setEditVisible] = useState(false);
  return (
    <Row style={{ paddingLeft: '10%', paddingRight : '10%'}}>
      <Card style={{ width: '100%', cursor: 'pointer' }} className="mt-3 align-items-center">
        <Card.Body onClick={() => history.push(BOARD + '/' + project.id)}>
          <Card.Title>
            {project.proj_name}
          </Card.Title>
          <Card.Text>
            {project.description}
          </Card.Text>
        </Card.Body>
        <Container className="d-flex flex-column">
          {user.user.role === 'ADMIN'
            ? (
              <Button variant="outline-primary" onClick={() => setEditVisible(true)}>
                edit project
              </Button>
            )
            // eslint-disable-next-line react/jsx-no-useless-fragment
            : <></>}
          <UpdateProject show={editVisible} onHide={() => setEditVisible(false)} project={project} />
        </Container>
      </Card>
    </Row>
  );
});

export default ProjectItem;
