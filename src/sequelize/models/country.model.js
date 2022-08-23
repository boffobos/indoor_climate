var { DataTypes } = require('sequelize');

var country = (sequelize) => {
    sequelize.define('country', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    })
}
module.exports = country;