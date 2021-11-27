const { Issue } = require('../models/models');

async function create(req, res) {
  const { sum, due, pri } = req.body;
  const issue = await Issue.create({ summary: sum, /* due_date: due, */ priority: pri });
  return res.json(issue);
}

async function getAll(req, res) {
  res.json({ message: 'issue.getAll' });
}

async function getOne(req, res) {
  const { query } = req;
  res.json(query);
}

module.exports = {
  create,
  getOne,
  getAll,
};
