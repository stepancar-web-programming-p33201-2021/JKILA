async function create(req, res) {
  res.json({ message: 'project.created' });
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
