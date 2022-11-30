var { DataTypes } = require('sequelize');
var cryptPassword = require('../../utils/cryptPassword');


var user = (sequelize) => {
    sequelize.define('user', {
        nickname: {
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
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        }
    }, {
        createdAt: 'registered',
        updatedAt: false,
        hooks: {
            async beforeSave(user) {
                if (user.changed('password') || user.isNewRecord) {
                    user.password = await cryptPassword.hash(user.password);
                }
            }
        }
    });
};

module.exports = user;