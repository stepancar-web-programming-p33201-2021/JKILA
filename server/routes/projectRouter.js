const Router = require('express');
const projectController = require('../controllers/projectController');

const router = new Router();

router.post('/', projectController.create);
// router.post('/delete/:id', projectController.destroy);
router.post('/update', projectController.update);

router.get('/all/:id', projectController.getAll);
router.get('/one/:id', projectController.getOne);

module.exports = router;
