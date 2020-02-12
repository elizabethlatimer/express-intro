function queryToArray(req) {
  let nums = req.query.nums.split(',');
  return nums;
}

function calcMean(nums) {
  let sum = nums.reduce((prev, curr) => curr += prev);
  let mean = (sum / nums.length).toFixed(2);
  return mean;
}

function calcMode(nums) {
  let count = {};
  let mode = [];
  let highestFreq = 0;

  for (let num of nums) {
    count[num] ? count[num]++ : count[num] = 1;
  }
  for (let num in count) {
    if (count[num] === highestFreq) {
      mode.push(num);
    } else if (count[num] > highestFreq) {
      mode = [num];
      highestFreq = count[num];
    }
  }
  return mode;
}

function calcMedian(nums) {
  let median;
  let midIndex = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    median = (nums[midIndex] + nums[midIndex - 1]) / 2
  } else {
    median = nums[midIndex];
  }
  return median;
}

module.exports = {queryToArray, calcMean, calcMode, calcMedian}