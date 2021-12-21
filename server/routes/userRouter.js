const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.check);
router.get('/getAllByWs/:id', userController.getAll);
router.get('/getAssignees/:id', userController.getAssignees);
router.get('/getOne/:id', userController.getOne);

module.exports = router;
