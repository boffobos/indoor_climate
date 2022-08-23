var { DataTypes } = require('sequelize');

var address = (sequelize) => {
    sequelize.define('address', {
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        building_n: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apartment_n: DataTypes.STRING,
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};

module.exports = address;