const { DataTypes } = require('sequelize');

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
        },
        // registered: {
        //     type: DataTypes.DATE,
        //     allowNull: false
        // },

    }, {
        createdAt: 'registered',
        updatedAt: false,
    })
};

module.exports = user;