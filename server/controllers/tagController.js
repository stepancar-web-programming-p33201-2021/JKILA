async function create(req, res) {
  res.json({ message: 'tag.created' });
}

async function getAll(req, res) {
  res.json({ message: 'tag.getAll' });
}

async function getOne(req, res) {
  res.json({ message: 'tag.getOne' });
}

module.exports = {
  create,
  getOne,
  getAll,
};
