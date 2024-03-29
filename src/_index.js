var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('node:path');
var getRoomTemp = require('./utils/getRoomTemp');
var sensorAddress = 'http://192.168.1.23/get-data';

var app = express();
var port = process.env.port || 3000;

var publicDir = path.join(__dirname, '../public/');
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(cors())
// app.use(bodyParser.text());
// app.use(bodyParser.raw());

app.get('/climate', (req, res) => {

	console.log(req.socket.remoteAddress);
	const roomData = getRoomTemp(sensorAddress); // add condition where sourse is unavailable
	roomData.then(data => {
		res.send(data);
	})
});

app.get('/esp', (req, res) => {
	const esp = require('../public/esp.html');
	res.send(esp);
});

app.get('/update-sensor', (req, res) => {
	console.log(req.query);
	res.send('ok').status(200);
});

app.post('/post-sensor-data', (req, res) => {
	// console.log(req.headers);
	if (typeof req.body === 'object') {
		console.log(req.body);
		res.sendStatus(200);
	} else {
		try {
			body = JSON.parse(req.body);
			console.log(body);
			res.sendStatus(200);
		} catch {
			res.send('JSON only accepted').status(406);
		}
	}
})

app.listen(port, () => {
	console.log('Server has started on port ' + port);
});


// const sequelize = require('sequelize');
// var { Sequelize } = require('sequelize');
// const sequelize = require('./libraries/Database');

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