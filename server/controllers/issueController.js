async function create(req, res) {
  res.json({ message: 'issue.created' });
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
