const { Workspace } = require('../models/models');

async function create(req, res) {
  const { name, desc } = req.body;
  const workspace = await Workspace.create({ workspace_name: name, description: desc });
  return res.json(workspace);
}

async function getAll(req, res) {
  res.json({ message: 'workspace.getAll' });
}

async function getOne(req, res) {
  res.json({ message: 'workspace.getOne' });
}

module.exports = {
  create,
  getOne,
  getAll,
};
