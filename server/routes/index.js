const Router = require('express');

const router = new Router();

const userRouter = require('./userRouter');
const workspaceRouter = require('./workspaceRouter');
const projectRouter = require('./projectRouter');
const issueRouter = require('./issueRouter');
const tagRouter = require('./tagRouter');
const commentRouter = require('./commentRouter');

router.use('/user', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/project', projectRouter);
router.use('/issue', issueRouter);
router.use('/tag', tagRouter);
router.use('/comment', commentRouter);

module.exports = router;
