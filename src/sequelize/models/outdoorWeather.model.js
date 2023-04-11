var { DataTypes } = require('sequelize');

var outdoorWeather = (sequelize) => {
	sequelize.define('outdoor_weather', {
		date: {
			type: DataTypes.DATE
		},
		temperature: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		humidity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		pressure: {
			type: DataTypes.INTEGER
		},
		wind_speed: {
			type: DataTypes.FLOAT,
			// allowNull: false
		},
		wind_azimuth: {
			type: DataTypes.INTEGER,
			// allowNull: false
		},
		latitude: {
			type: DataTypes.FLOAT
		},
		longitude: {
			type: DataTypes.FLOAT
		}
	}, {
		tableName: 'outdoor_weather',
		createdAt: 'date',
		updatedAt: false,
	});
};

module.exports = outdoorWeather;