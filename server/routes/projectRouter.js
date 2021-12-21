const Router = require('express');
const projectController = require('../controllers/projectController');

const router = new Router();

router.post('/', projectController.create);
router.post('/:id', projectController.destroy);

router.get('/all/:id', projectController.getAll);
router.get('/one/:id', projectController.getOne);

module.exports = router;
