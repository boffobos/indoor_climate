var { Model, DataTypes } = require('sequelize');
var sequelize = require('../libraries/Database');

var sensor = (sequelize) => {
    sequelize.define('sensor', {
        mac: {
            type: DataTypes.MACADDR,
            validate: {
                is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
            }
        },
        room: DataTypes.STRING,
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: true
            // references: { ??? }
        },
        registered: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: { ??? }
        }

    }, {
        createdAt: 'registered',
        updatedAt: false
    });
};

module.exports = sensor;