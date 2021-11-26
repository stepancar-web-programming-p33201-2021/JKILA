const Router = require('express');

const router = new Router();

const userRouter = require('./userRouter');
const workspaceRouter = require('./workspaceRouter');
const projectRouter = require('./projectRouter');
const issueRouter = require('./issueRouter');
const tagRouter = require('./tagRouter');

router.use('/user', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/project', projectRouter);
router.use('/issue', issueRouter);
router.use('/tag', tagRouter);

module.exports = router;
