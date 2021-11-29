const { Workspace } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { name, desc } = req.body;
  const workspace = await Workspace.create({
    workspace_name: name, description: desc,
  });
  return res.json(workspace);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Workspace.destroy({ where: { id } });
  return res.json({ message: `Workspace with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const workspaces = await Workspace.findAll();
  return res.json(workspaces);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const workspace = await Workspace.findOne({ where: { id } });
  if (workspace === null) {
    return next(customError.badRequest('There is no WORKSPACE with this ID'));
  }
  res.json(workspace);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};
