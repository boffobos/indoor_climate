require('dotenv').config();
var http = require('http');
var path = require('node:path');
var app = require('./express/app');

var server = http.createServer(app);
var port = process.env.STATUS === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

server.listen(port, () => {
	console.log('Server started on port:' + port);
});

/* Starts getting outdoor weather and place in db */
// Separate this functionality to other file
var getOutdoorWeather = require('./utils/getOutdoorWeather');
var OutdoorWeather = require('./sequelize/index').models.outdoor_weather;
setInterval(async () => {
	var data = await getOutdoorWeather({ lat: 53.903831, lon: 27.473899 });
	await OutdoorWeather.create(data);
	console.log('added');
}, 1000 * 60 * process.env.REQUEST_INTERVAL_MIN);