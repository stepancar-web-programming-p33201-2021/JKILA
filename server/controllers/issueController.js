const { Issue, User, Tag } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const {
    summary, due, priority, status, project, desc, reporter,
  } = req.body;
  const issue = await Issue.create({
    summary,
    due_date: due,
    priority,
    status,
    project_id: project,
    description: desc,
    reporter_id: reporter,
  });
  return res.json(issue);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Issue.destroy({ where: { id } });
  return res.json({ message: `Issue with ID = ${id} deleted` });
}

async function update(req, res) {
  const { id, status } = req.body;
  await Issue.update({ status }, { where: { id } });
  return res.json({ message: `Issue with ID = ${id} updated` });
}

async function addAssignee(req, res) {
  const { username, id } = req.body;
  const issue = await Issue.findOne({ where: { id } });
  const user = await User.findOne({ where: { username } });
  await issue.addUser(user);
  return res.json(issue);
}

async function addTag(req, res) {
  const { tagName, id } = req.body;
  const issue = await Issue.findOne({ where: { id } });
  const tag = await Tag.findOne({ where: { tag_name: tagName, project_id: issue.project_id } });
  await issue.addTag(tag);
  return res.json(issue);
}

async function getAll(req, res) {
  let issues;
  const { priority, status } = req.query;
  const { id } = req.params;
  if (!priority && !status) {
    issues = await Issue.findAll({ where: { project_id: id } });
  }
  if (priority && !status) {
    issues = await Issue.findAll({ where: { priority, project_id: id } });
  }
  if (!priority && status) {
    issues = await Issue.findAll({ where: { status, project_id: id } });
  }
  if (priority && status) {
    issues = await Issue.findAll({ where: { priority, status, project_id: id } });
  }
  return res.json(issues);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const issue = await Issue.findOne({ where: { id } });
  if (issue === null) {
    return next(customError.badRequest('There is no ISSUE with this ID'));
  }
  return res.json(issue);
}

module.exports = {
  create,
  update,
  getOne,
  getAll,
  destroy,
  addAssignee,
  addTag,
};
