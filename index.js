const express = require("express");
const app = express();
const path = require("path");
const members = require("./data/members");
const bodyParser=require("body-parser")


const logger = (req, res, next) => {
  console.log("logger middleware");
  next();
};
app.use(logger);
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members',require('./routes/member'));

app.listen("4004", () => {
  console.log("server got started");
});
