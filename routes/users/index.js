const express = require('express');
const pointsRouter = require('./points');
const usersRouter = express.Router();

usersRouter.use('/:userId([0-9]+)/points', pointsRouter);

module.exports = usersRouter;
