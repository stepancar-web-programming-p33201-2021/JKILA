const { Tag } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { name } = req.body;
  const tag = await Tag.create({ tag_name: name });
  return res.json(tag);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Tag.destroy({ where: { id } });
  return res.json({ message: `Tag with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const tags = await Tag.findAll();
  return res.json(tags);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const tag = await Tag.findOne({ where: { id } });
  if (tag === null) {
    return next(customError.badRequest('There is no TAG with this ID'));
  }
  res.json(tag);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};
