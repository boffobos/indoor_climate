var { DataTypes } = require('sequelize');

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
            defaultValue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).valueOf(),
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