const Router = require('express');
const commentController = require('../controllers/commentController');

const router = new Router();

router.post('/', commentController.create);
router.post('/del/:id', commentController.destroy);
router.post('/update/:id', commentController.update);

router.get('/:id', commentController.getAll);

module.exports = router;
