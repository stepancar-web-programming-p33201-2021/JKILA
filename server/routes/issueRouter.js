const Router = require('express');
const issueController = require('../controllers/issueController');

const router = new Router();

router.post('/', issueController.create);
router.post('/delete/:id', issueController.destroy);
router.post('/update', issueController.update);
router.post('/assignee', issueController.addAssignee);
router.post('/tag', issueController.addTag);

router.get('/:id', issueController.getAll);
// router.get('/:id', issueController.getOne);

module.exports = router;
