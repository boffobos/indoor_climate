var { DataTypes } = require('sequelize');

var token = (sequelize) => {
    sequelize.define('token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        expired: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'user'
        }
    }, {
        timestamps: false
    });
};
module.exports = token;