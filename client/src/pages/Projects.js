import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Context } from '../index';

import { fetchUsersByWs } from '../http/userAPI';
import { fetchProjects } from '../http/projectApi';
import CreateProject from '../modals/createProject';
import ProjectList from '../components/ProjectList';

const Projects = observer(() => {
  const { project } = useContext(Context);
  const { id } = useParams();
  const [projectVisible, setProjectVisible] = useState(false);

  useEffect(() => {
    fetchProjects(id).then((data) => project.setProjects(data));
    fetchUsersByWs(id).then((data) => project.setUsers(data));
  }, []);

  return (
    <div>
      <ProjectList />
      <Container className="d-flex flex-column">
        <Button variant="outline-danger" onClick={() => setProjectVisible(true)}>
          Create Project
        </Button>
        <CreateProject show={projectVisible} onHide={() => setProjectVisible(false)} />
      </Container>
    </div>
  );
});

export default Projects;
