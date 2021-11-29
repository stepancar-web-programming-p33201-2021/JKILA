const { Issue } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const {
    summary, due, priority, status, project, creator,
  } = req.body;
  const issue = await Issue.create({
    summary, due_date: due, priority, status, project_id: project, creator_id: creator,
  });
  return res.json(issue);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Issue.destroy({ where: { id } });
  return res.json({ message: `Issue with ID = ${id} deleted` });
}

async function getAll(req, res) {
  let issues;
  const { priority, status } = req.query;
  if (!priority && !status) {
    issues = await Issue.findAll();
  }
  if (priority && !status) {
    issues = await Issue.findAll({ where: { priority } });
  }
  if (!priority && status) {
    issues = await Issue.findAll({ where: { status } });
  }
  if (priority && status) {
    issues = await Issue.findAll({ where: { priority, status } });
  }

  return res.json(issues);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const issue = await Issue.findOne({ where: { id } });
  if (issue === null) {
    return next(customError.badRequest('There is no ISSUE with this ID'));
  }
  res.json(issue);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};
