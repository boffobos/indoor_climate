var { DataTypes } = require('sequelize');
var ms = require('ms');

var token = (sequelize) => {
    sequelize.define('token', {
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        expired: {
            type: DataTypes.DATE,
            defaultValue: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN)).valueOf(),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: 'user'
        }
    }, {
        timestamps: false
    });
};
module.exports = token;