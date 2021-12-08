const Router = require('express');
const issueController = require('../controllers/issueController');

const router = new Router();

router.post('/', issueController.create);
router.post('/:id', issueController.destroy);

router.get('/:id', issueController.getAll);
// router.get('/:id', issueController.getOne);

module.exports = router;
