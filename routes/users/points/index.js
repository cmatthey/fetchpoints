const express = require("express");
const balance = require("./balance");
const addPoints = require("./addPoints");
const deductPoints = require("./deductPoints");
const pointsRouter = express.Router({ mergeParams: true });
const checkInputAddPoints = require("./middleware/checkInputAddPoints");

pointsRouter
  .get("/", balance)
  .post("/add", checkInputAddPoints, addPoints)
  .post("/deduct", deductPoints);

module.exports = pointsRouter;
