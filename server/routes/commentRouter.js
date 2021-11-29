const Router = require('express');
const commentController = require('../controllers/commentController');

const router = new Router();

router.post('/', commentController.create);
router.post('/:id', commentController.destroy);

router.get('/', commentController.getAll);
router.get('/:id', commentController.getOne);

module.exports = router;
