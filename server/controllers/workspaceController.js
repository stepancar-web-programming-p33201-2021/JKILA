const { Workspace, User } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { name, desc, code } = req.body;
  const workspace = await Workspace.create({
    workspace_name: name, description: desc, code,
  });
  return res.json(workspace);
}

async function update(req, res) {
  const {
    id, name, desc, code
  } = req.body;
  await Workspace.update({
    workspace_name: name, description: desc, code,
  }, { where: { id } });
  return res.json({ message: `Workspace with ID = ${id} updated` });
}

async function destroy(req, res) {
  const { id } = req.params;
  await Workspace.destroy({ where: { id } });
  return res.json({ message: `Workspace with ID = ${id} deleted` });
}

async function join(req, res, next) {
  const { id, code } = req.body;
  const workspace = await Workspace.findOne({ where: { code } });
  const user = await User.findOne({ where: { id } });
  if (workspace === null) {
    return next(customError.badRequest('There is no WORKSPACE with this code'));
  }
  await workspace.addUser(user);
  return res.json(workspace);
}

async function getAll(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  const workspaces = await user.getWorkspaces();
  return res.json(workspaces);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const workspace = await Workspace.findOne({ where: { id } });
  if (workspace === null) {
    return next(customError.badRequest('There is no WORKSPACE with this ID'));
  }
  return res.json(workspace);
}

module.exports = {
  create,
  getOne,
  join,
  getAll,
  destroy,
  update,
};
