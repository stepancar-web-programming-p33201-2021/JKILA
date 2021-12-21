import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import ProjectItem from './ProjectItem';

const ProjectList = observer(() => {
  const { project } = useContext(Context);

  return (
    <Row className="d-flex ">
      {project.projects
        .map((proj) => <ProjectItem key={proj.id} project={proj} />)}
    </Row>
  );
});

export default ProjectList;
