async function create(req, res) {
  res.json({ message: 'workspace.created' });
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
