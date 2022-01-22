import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router-dom';
import { Context } from '../index';

import { fetchUsersByWs } from '../http/userAPI';
import { fetchProjects } from '../http/projectApi';
import CreateProject from '../modals/createProject';
import ProjectList from '../components/ProjectList';

const Projects = observer(() => {
  const { project, user } = useContext(Context);
  const history = useHistory();
  const { id } = useParams();
  const [projectVisible, setProjectVisible] = useState(false);

  useEffect(() => {
    fetchProjects(id).then((data) => project.setProjects(data));
    fetchUsersByWs(id).then((data) => {
      project.setUsers(data);
      if (!project.users.map((user1) => user1.id).includes(user.user.id)) {
        history.push('/');
      }
    });
  }, []);

  return (
    <div>
      <ProjectList />
      <Container className="d-flex flex-column">
        {user.user.role === 'ADMIN'
          ? (
            <Button variant="outline-info" onClick={() => setProjectVisible(true)}>
              Create Project
            </Button>
          )
          // eslint-disable-next-line react/jsx-no-useless-fragment
          : <></>}
        <CreateProject show={projectVisible} onHide={() => setProjectVisible(false)} />
      </Container>
    </div>
  );
});

export default Projects;
