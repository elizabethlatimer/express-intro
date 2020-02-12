const express = require("express");
const {ExpressError} = require("./errors");

const app = express();
const { calcMean, calcMode, calcMedian } = require("./helpers");
const {checkForEmpty, validateInputCreateArray} = require("./middleware");


app.use(express.json());

app.use(["/mean", "/median", "/mode"], checkForEmpty, validateInputCreateArray);


app.get("/mean", function (req, res) {
  let nums = res.locals.nums;

  let mean = calcMean(nums);
  return res.json({ operation: "mean", value: mean });

});

app.get("/mode", function (req, res) {
  let nums = res.locals.nums;

  let mode = calcMode(nums);
  return res.json({ operation: "mode", value: mode });
});

app.get("/median", function (req, res) {
  let nums = res.locals.nums;

  nums = nums.sort((a, b) => a - b);
  let median = calcMedian(nums);
  return res.json({ operation: "median", value: median });
});

app.use(function(req, res, next) {
  const notFoundError = new ExpressError("not found", 404);
  return next(notFoundError);
})

app.use(function(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: {message, status}
  });
});

app.listen(3000, function () {
  console.log("Running on port 3000");
});

