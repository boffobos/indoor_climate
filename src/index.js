require('dotenv').config();
var http = require('http');
var path = require('node:path');
var app = require('./express/app');

var server = http.createServer(app);
var port = process.env.STATUS === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

server.listen(port, () => {
    console.log('Server started on port:' + port);
});