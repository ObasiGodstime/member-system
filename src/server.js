"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

const server = express();

//cors configuration
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//compression and body parser for incoming post request
server.use(compression());
server.use(bodyParser.json());

// Routes will always go here
server.use("/", require("./routes/routes"));

server.listen(3001, function () {
  console.log("listening on port 3001!");
});
