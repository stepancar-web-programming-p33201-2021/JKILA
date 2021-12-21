const { Tag, Issue } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { tagName, projectId } = req.body;
  const tag = await Tag.create({ tag_name: tagName, project_id: projectId });
  return res.json(tag);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Tag.destroy({ where: { id } });
  return res.json({ message: `Tag with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const { id } = req.params;
  const tags = await Tag.findAll({ where: { project_id: id } });
  return res.json(tags);
}

async function getIssueTags(req, res) {
  const { id } = req.params;
  const issue = await Issue.findOne({ where: { id } });
  const tags = await issue.getTags();
  return res.json(tags);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const tag = await Tag.findOne({ where: { id } });
  if (tag === null) {
    return next(customError.badRequest('There is no TAG with this ID'));
  }
  return res.json(tag);
}

module.exports = {
  create,
  getOne,
  getAll,
  getIssueTags,
  destroy,
};
