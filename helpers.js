function queryToArray(req) {
  let nums = req.query.nums.split(',').map(val => +val);


  return nums;
}


module.exports = {queryToArray}