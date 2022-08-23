function ralationsSetup(sequelize) {
    var {
        country,
        address,
        sensorData,
        sensor,
        user,
        token,
        userAddress
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
    address.hasMany(sensorData, {
        foreignKey: 'address_id',
    });
    sensorData.belongsTo(address);

    user.hasMany(sensor, {
        foreignKey: 'user_id',
    });
    sensor.belongsTo(user);
    user.hasMany(token, {
        foreignKey: 'user_id',
    });
    token.belongsTo(user);

    user.belongsToMany(address, { through: userAddress });
    address.belongsToMany(user, { through: userAddress });
}