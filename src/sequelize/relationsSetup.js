function ralationsSetup(sequelize) {
    var {
        country,
        address,
        sensor_data,
        sensor,
        user,
        token,
        user_address
    } = sequelize.models;

    country.hasMany(address, {
        foreignKey: 'country_id',
        sourceKey: 'id' //just example to define source key to refer to
    });
    address.belongsTo(country);

    address.hasMany(sensor, {
        foreignKey: 'address_id',
    });
    sensor.belongsTo(address);
    address.hasMany(sensor_data, {
        foreignKey: 'address_id',
    });
    sensor_data.belongsTo(address);

    user.hasMany(sensor, {
        foreignKey: 'user_id',
    });
    sensor.belongsTo(user);
    user.hasMany(token, {
        foreignKey: 'user_id',
    });
    token.belongsTo(user);

    user.belongsToMany(address, { through: user_address });
    address.belongsToMany(user, { through: user_address });
}

module.exports = ralationsSetup;