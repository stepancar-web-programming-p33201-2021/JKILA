const { Project } = require('../models/models');

async function create(req, res) {
  const { name, work } = req.body;
  const project = await Project.create({ proj_name: name, ws_id: work });
  return res.json(project);
}

async function getAll(req, res) {
  res.json({ message: 'project.getAll' });
}

async function getOne(req, res) {
  res.json({ message: 'project.getOne' });
}

module.exports = {
  create,
  getOne,
  getAll,
};
