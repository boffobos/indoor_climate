var { Sequelize } = require('sequelize');
var { DIALECT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
var sequelize = new Sequelize(`${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);
var relations = require('./relationsSetup');

var models = require('./models/index');

for (let model in models) {
    models[model](sequelize);
}

relations(sequelize);

module.exports = sequelize;