var express = require('express');
var app = express();
var userRouter = require('./routes/users');
var sensorRouter = require('./routes/sensors');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

app.use(userRouter);
app.use(sensorRouter);

module.exports = app;