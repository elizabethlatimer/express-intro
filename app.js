const express = require("express");
const app = express();
const { queryToArray } = require("./helpers");
app.use(express.json());


app.get("/mean", function (req, res) {
  let nums = queryToArray(req);
  let sum = nums.reduce((prev, curr) => curr += prev);
  let mean = (sum / nums.length).toFixed(2);
  return res.json({ operation: "mean", value: mean });
});

app.get("/mode", function (req, res) {
  let nums = queryToArray(req);
  let count = {};
  let mode = [];
  let highestFreq = 0;

  for (let num of nums) {
    count[num] ? count[num]++ : count[num] = 1;
  }
  console.log(count)
  for (let num in count) {
    if (count[num] === highestFreq) {
      mode.push(num);
    } else if (count[num] > highestFreq) {
      mode = [num];
      highestFreq = count[num];
    }
  }
  return res.json({ operation: "mode", value: mode });
});

app.get("/median", function (req, res) {
  let nums = queryToArray(req).sort((a, b) => a - b);
  let median;
  let midIndex = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    median = (nums[midIndex] + nums[midIndex - 1]) / 2
  } else {
    median = nums[midIndex];
  }
  return res.json({ operation: "median", value: median });

});

app.listen(3000, function () {
  console.log("Running on port 3000");
});

