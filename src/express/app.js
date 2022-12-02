var express = require('express');
var app = express();
var userRouter = require('./routes/users');
var sensorRouter = require('./routes/sensors');
var sDataRouter = require('./routes/sensorData');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

app.use(userRouter);
app.use(sensorRouter);
app.use(sDataRouter);

module.exports = app;