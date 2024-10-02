const express = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const app = express();
const port = 3000;

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 1, // allow 1 requests to go at full-speed, then...
  delayMs: 5000, // 2000ms delay for each request after the delayAfter limit
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

app.use(speedLimiter);
app.use(limiter);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
