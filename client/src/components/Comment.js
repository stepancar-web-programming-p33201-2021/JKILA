import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Card, Form } from 'react-bootstrap';

import { Context } from '../index';
import { destroyComment, updateComment } from '../http/commentApi';

const Comment = observer(({ comment }) => {
  const { project, user } = useContext(Context);

  const [newBody, setNewBody] = useState(comment.body);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const editComment = () => {
    updateComment(comment.id, newBody).then((data) => {
      project.setReloadComments(data.message);
      setIsFormOpen(false);
    });
  };

  const deleteComment = () => {
    destroyComment(comment.id).then((data) => {
      project.setReloadComments(data.message);
    });
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title>
          {project.users
            .filter((userPr) => userPr.id === comment.user_id)
            .map((userPr) => <p>{userPr.username}</p>)}
        </Card.Title>
      </Card.Header>
      {!isFormOpen
        ? (
          <Card.Body>
            <Card.Text>{comment.body}</Card.Text>
            {user.user.id === comment.user_id
              ? (
                <>
                  <Button variant="link" onClick={() => setIsFormOpen(true)}> Edit </Button>
                  <Button variant="link" onClick={() => deleteComment()}> Delete </Button>
                </>
              )
            // eslint-disable-next-line react/jsx-no-useless-fragment
              : <></>}
          </Card.Body>
        )
        : (
          <Card.Body>
            <Form.Control
              as="textarea"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Add a comment"
            />
            <Button variant="primary" active onClick={() => editComment()}> Save </Button>
            <Button variant="light" active onClick={() => setIsFormOpen(false)}> Cancel </Button>
          </Card.Body>
        )}
      {/* <div>---------------------------</div> */}
    </Card>
  );
});

export default Comment;
