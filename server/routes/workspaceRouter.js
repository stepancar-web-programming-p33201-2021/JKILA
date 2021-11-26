const Router = require('express');
const workspaceController = require('../controllers/workspaceController');

const router = new Router();

router.post('/', workspaceController.create);
router.get('/', workspaceController.getAll);
router.get('/:id', workspaceController.getOne);

module.exports = router;
