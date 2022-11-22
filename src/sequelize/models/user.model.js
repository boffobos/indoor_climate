var { DataTypes } = require('sequelize');
var cryptPassword = require('../../utils/cryptPassword');


var user = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        createdAt: 'registered',
        updatedAt: false,
        hooks: {
            async beforeCreate(user) {
                if (user.changed('password') || user.isNewRecord) {
                    user.password = await cryptPassword.hash(user.password);
                }
            }
        }
    });
};

module.exports = user;