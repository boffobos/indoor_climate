var { Sequelize } = require('sequelize');
var { DIALECT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
var sequelize = new Sequelize(`${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);
var models = require('./models/index');
var relations = require('./relationsSetup');

for (const model in models) {
    models[model](sequelize);
}

relations(sequelize);

module.exports = sequelize;