const { Comment } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { body, author, issue } = req.body;
  const comment = await Comment.create({
    body, user_id: author, issue_id: issue,
  });
  return res.json(comment);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Comment.destroy({ where: { id } });
  return res.json({ message: `Comment with ID = ${id} deleted` });
}

async function update(req, res) {
  const { id } = req.params;
  const { body } = req.body;
  await Comment.update({
    body,
  }, { where: { id } });
  return res.json({ message: `Comment with ID = ${id} updated` });
}

async function getAll(req, res) {
  const { id } = req.params;
  const comments = await Comment.findAll({
    where: { issue_id: id },
    order: [['createdAt', 'DESC']],
  });
  return res.json(comments);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const comment = await Comment.findOne({ where: { id } });
  if (comment === null) {
    return next(customError.badRequest('There is no COMMENT with this ID'));
  }
  return res.json(comment);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
  update,
};
