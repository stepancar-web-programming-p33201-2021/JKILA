const Router = require('express');
const issueController = require('../controllers/issueController');

const router = new Router();

router.post('/', issueController.create);
router.post('/delete/:id', issueController.destroy);
router.post('/destroyt/:id', issueController.destroyIssueTags);
router.post('/destroya/:id', issueController.destroyIssueAssignees);
router.post('/update', issueController.update);
router.post('/upd_status', issueController.updateStatus);
router.post('/assignee', issueController.addAssignee);
router.post('/tag', issueController.addTag);

router.get('/all/:id', issueController.getAll);
router.get('/one/:id', issueController.getOne);

module.exports = router;
