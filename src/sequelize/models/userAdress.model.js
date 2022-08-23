var { DataTypes } = require('sequelize');

var userAddres = (sequelize) => {
    sequelize.define('user_address', {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_addresses',
        timestamps: false
    });
};

module.exports = userAddres;