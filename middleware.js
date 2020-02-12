const { ExpressError } = require("./errors");
const { queryToArray } = require("./helpers");

function checkForEmpty(req, res, next) {
  try {
    if (!req.query.nums || req.query.nums.length === 0) {
      throw new ExpressError("Number inputs are required", 400);
    }
  }
  catch (error) {
    return next(error);
  }
  return next();
}

function validateInputCreateArray(req, res, next) {
  let nums = queryToArray(req).map(val => {
    try {
      if (val === "" || isNaN(+val)) {
        throw new ExpressError(`${val} is not a number`, 400);
      }
      return +val;
    }
    catch (error) {
      return next(error);
    }
  });

  res.locals.nums = nums;
  return next();
}

module.exports = { checkForEmpty, validateInputCreateArray };