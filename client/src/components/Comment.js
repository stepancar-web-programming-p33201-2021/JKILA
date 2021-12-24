import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Form } from 'react-bootstrap';

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
    <div>
      <div>
        {project.users
          .filter((userPr) => userPr.id === comment.user_id)
          .map((userPr) => <p>{userPr.username}</p>)}
        {!isFormOpen
          ? (
            <>
              <p>{comment.body}</p>
              {user.user.id === comment.user_id
                ? (
                  <>
                    <Button variant="link" onClick={() => setIsFormOpen(true)}> Edit </Button>
                    <Button variant="link" onClick={() => deleteComment()}> Delete </Button>
                  </>
                )
                // eslint-disable-next-line react/jsx-no-useless-fragment
                : <></>}
            </>
          )
          : (
            <>
              <Form.Control
                as="textarea"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Add a comment"
              />
              <Button variant="primary" active onClick={() => editComment()}> Save </Button>
              <Button variant="light" active onClick={() => setIsFormOpen(false)}> Cancel </Button>
            </>
          )}
        <div>---------------------------</div>
      </div>
    </div>
  );
});

export default Comment;
