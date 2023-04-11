var https = require('node:https');

// This func gets wheather from https://openweathermap.org/current
function getOutdoorWeather(coords) {
	var openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.OW_API_KEY}&units=metric`
	return new Promise((resolve, reject) => {
		https.get(openWeatherUrl, res => {
			var data = '';
			res.on('data', (d) => {
				data += d;
			});

			res.on('close', () => {
				if (data && res.statusCode == 200) {
					if (res.headers['content-type'].includes('application/json')) {
						data = JSON.parse(data);
						var date = new Date();
						resolve({
							date: date,
							temperature: data.main.temp,
							humidity: data.main.humidity,
							pressure: data.main.pressure,
							wind_speed: data.wind.speed,
							wind_azimuth: data.wind.deg,
							latitude: coords.lat,
							longitude: coords.lon
						});
					}
				}
			});

		}).on('error', e => {
			reject(e);
		});

	});
}

module.exports = getOutdoorWeather;