const Router = require('express');
const workspaceController = require('../controllers/workspaceController');

const router = new Router();

router.post('/', workspaceController.create);
router.post('/join', workspaceController.join);

router.get('/:id', workspaceController.getAll);

module.exports = router;
