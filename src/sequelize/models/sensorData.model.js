var { DataTypes } = require('sequelize');

var sensorData = (sequelize) => {
    sequelize.define('sensor_data', {
        temperature: {
            type: DataTypes.FLOAT,
            // allowNull: false
        },
        humidity: {
            type: DataTypes.FLOAT,
            // allowNull: false
        },
        pressure: {
            type: DataTypes.FLOAT
        },
        address_id: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        place: DataTypes.STRING,
        time: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'sensors_data',
        createdAt: 'time',
        updatedAt: false,
    });
};

module.exports = sensorData;