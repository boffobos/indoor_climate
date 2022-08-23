require('dotenv').config();
var http = require('http');
var path = require('node:path');
// const sequelize = require('sequelize');
// var { Sequelize } = require('sequelize');
// const sequelize = require('./libraries/Database');
const User = require('./models/user.model');
var server = http.createServer();

// var me = User.create({
//     name: 'Denis Zhurov',
//     email: 'den_fobos@mail.ru',
//     password: '123456',

// }).then(() => {
//     console.log('User created')
// }).catch((e) => {
//     console.log('Failed to add user to db', e);
// })

var users = User.findAll();
users.then(data => {
    data.every(user => console.log(user.getDataValue('email')));
});

server.on('request', (req, res) => {
    const { url, method, headers } = req;
    // console.log(url);
    // console.log(method);
    // console.log(headers);
    if (headers['content-type'] == 'application/json') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(JSON.parse(body));
        });
    }
    res.write("hello world");
    res.statusCode = 200;
    res.end();
    req.on('error', () => {
        console.log('Error during http request');
        res.setHeader(503);
        res.end('error on server');
    })
});
server.on('error', (e) => {
    console.log('server error was heppend');
    console.log(e);
});

server.listen(3000);