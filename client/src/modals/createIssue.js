import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { createIssue } from '../http/issueApi';

const CreateIssue = function () {

  const create = async () => {
    try {
      data = await createIssue();
    }
    catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Modal>
      <Button>

      </Button>
    </Modal>
  );
};

export default CreateIssue;
