var { DataTypes } = require('sequelize');

var userAddress = (sequelize) => {
    sequelize.define('user_address', {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'address',
                key: 'id'
            }

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        tableName: 'user_addresses',
        timestamps: false
    });
};

module.exports = userAddress;