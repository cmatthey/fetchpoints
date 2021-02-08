const express = require('express');
const balance = require('./balance');
const addPoints = require('./addPoints');
const deductPoints = require('./deductPoints');
const pointsRouter = express.Router({mergeParams: true});

pointsRouter.get('/', balance)
    .post('/add', addPoints)
    .post('/deduct', deductPoints);

module.exports = pointsRouter;
