var { DataTypes } = require('sequelize')

function relationsSetup(sequelize) {
    const {
        country,
        address,
        sensor_data,
        sensor,
        user,
        token,
        user_address
    } = sequelize.models;

    // country - addresses
    country.hasMany(address, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'country_id',
            allowNull: false,
        }
    });
    address.belongsTo(country, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'country_id',
            allowNull: false
        },
        targetKey: 'id' //just example to define source key to refer to
    });
    // address - sensors
    address.hasMany(sensor, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'address_id',
            allowNull: false,
        }
    });
    sensor.belongsTo(address, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'address_id',
            allowNull: false,
        }
    });
    // address - sensors_data
    address.hasMany(sensor_data, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'address_id',
            allowNull: false,
        }
    });
    sensor_data.belongsTo(address, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'address_id',
            allowNull: false,
        }
    });
    // User - Sensors
    user.hasMany(sensor, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'user_id',
            allowNull: false,
        }
    });
    sensor.belongsTo(user, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'user_id',
            allowNull: false,
        }
    });
    // User - Tokens
    user.hasMany(token, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'user_id',
            allowNull: false,
        }
    });
    token.belongsTo(user, {
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'user_id',
            allowNull: false,
        }
    });
    // users - addresses
    user.belongsToMany(address, {
        through: user_address,
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'user_id',
            allowNull: false
        }
    });
    address.belongsToMany(user, {
        through: user_address,
        foreignKey: {
            type: DataTypes.INTEGER,
            name: 'address_id',
            allowNull: false
        }
    });
}

module.exports = relationsSetup;