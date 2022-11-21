require('dotenv').config();
var http = require('http');
var path = require('node:path');
var app = require('./express/app');

// const sequelize = require('sequelize');
// var { Sequelize } = require('sequelize');
// const sequelize = require('./libraries/Database');

var server = http.createServer(app);

// var me = User.create({
//     name: 'Denis Zhurov',
//     email: 'den_fobos@mail.ru',
//     password: '123456',

// }).then(() => {
//     console.log('User created')
// }).catch((e) => {
//     console.log('Failed to add user to db', e);
// })

// var users = User.findAll();
// users.then(data => {
//     data.every(user => console.log(user.getDataValue('email')));
// });

// server.on('request', (req, res) => {
//     const { url, method, headers } = req;
//     // console.log(url);
//     // console.log(method);
//     // console.log(headers);
//     if (headers['content-type'] == 'application/json' && method === 'POST') {
//         let body = [];
//         req.on('data', (chunk) => {
//             body.push(chunk)
//         }).on('end', () => {
//             body = Buffer.concat(body).toString();
//             console.log(JSON.parse(body));
//         });
//     }
//     res.write("hello world");
//     res.statusCode = 200;
//     res.end();
//     req.on('error', () => {
//         console.log('Error during http request');
//         res.setHeader(503);
//         res.end('error on server');
//     })
// });
// server.on('error', (e) => {
//     console.log('server error was heppend');
//     console.log(e);
// });

var port = process.env.STATUS === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

server.listen(port, () => {
    console.log('Server started on port:' + port);
});