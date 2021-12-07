const Router = require('express');
const projectController = require('../controllers/projectController');

const router = new Router();

router.post('/', projectController.create);
router.post('/:id', projectController.destroy);

router.get('/:id', projectController.getAll);
// router.get('/:id', projectController.getOne);

module.exports = router;
