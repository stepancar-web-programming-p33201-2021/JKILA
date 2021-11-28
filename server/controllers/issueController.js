const { Issue } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const {
    sum, due, pri, stat,
  } = req.body;
  const issue = await Issue.create({
    summary: sum, due_date: due, priority: pri, status: stat,
  });
  return res.json(issue);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Issue.destroy({ where: { id } });
  return res.json({ message: `Issue with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const issues = await Issue.findAll();
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
