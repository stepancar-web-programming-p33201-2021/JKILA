const { Tag } = require('../models/models');
// const customError = require("../error/customError");

async function create(req, res) {
  const { tagName } = req.body;
  const tag = await Tag.create({ tag_name: tagName });
  return res.json(tag);
}
// TODO
async function destroy(req, res) {
  /* const { tagName } = req.query;
  await Tag.destroy(await Tag.findOne({ where: { tag_name: tagName } }));
  return res.json({ message: `tag ${tagName} deleted` }); */
}

async function getAll(req, res) {
  res.json({ message: 'tag.getAll' });
}

async function getOne(req, res, next) {
  /* const { id } = req.query;
  if (!id) {
    return next(customError.badRequest('Не указан ID'));
  }
  res.json(id); */
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};
