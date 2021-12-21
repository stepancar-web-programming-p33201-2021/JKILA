const Router = require('express');
const tagController = require('../controllers/tagController');

const router = new Router();

router.post('/', tagController.create);
router.post('/:id', tagController.destroy);

router.get('/project/:id', tagController.getAll);
router.get('/issue/:id', tagController.getIssueTags);
// router.get('/:id', tagController.getOne);

module.exports = router;
