var { DataTypes } = require('sequelize');
var crypto = require('node:crypto');


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
            beforeCreate(user) {
                var salt = crypto.randomBytes(16).toString('hex');
                return new Promise((resolve, reject) => {
                    crypto.pbkdf2(user.password, salt, 513, 59, 'SHA256', (error, hash) => {
                        if (error) {
                            return reject(new Error('Password hash was not been created'));
                        }
                        var password = `${salt}:${hash.toString('hex')}`;
                        user.password = password;
                        resolve(user);
                    })
                });
            }
        }
    });
};

module.exports = user;