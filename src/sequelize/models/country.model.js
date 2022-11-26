var { DataTypes } = require('sequelize');

var country = (sequelize) => {
    sequelize.define('country', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        iso: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nicename: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        iso3: {
            type: DataTypes.STRING,
            unique: true
        },
        numcode: {
            type: DataTypes.INTEGER,
            unique: true
        },
        phonecode: {
            type: DataTypes.INTEGER
        }

    }, {
        timestamps: false
    })
};

module.exports = country;