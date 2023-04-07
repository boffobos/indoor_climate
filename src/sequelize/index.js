var { Sequelize } = require('sequelize');
var { DIALECT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
var sequelize = new Sequelize(`${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);
var models = require('./models/index');
var relations = require('./relationsSetup');
var crypto = require('node:crypto');
var addCountriesSQL = require('./models/countriesList');

for (const model in models) {
	models[model](sequelize);
}

relations(sequelize);

sequelize.sync();  //check if it is possible to create new db without that

sequelize.models.country.findAll().then(result => {
	if (result.length === 0) {
		return sequelize.query(addCountriesSQL);
	}
	return
}).then(countries => {
	if (countries.length > 1) {
		console.log('Added coutries to database');
	}
}).catch(e => {
	console.log('Inserting countries into the table failed');
});


module.exports = sequelize;