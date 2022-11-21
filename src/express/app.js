var express = require('express');
var app = express();
var userRouter = require('./routes/users');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

app.use(userRouter);

module.exports = app;