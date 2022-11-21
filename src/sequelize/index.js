var { Sequelize } = require('sequelize');
var { DIALECT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
var sequelize = new Sequelize(`${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);
var models = require('./models/index');
var relations = require('./relationsSetup');
var crypto = require('node:crypto');

for (const model in models) {
    models[model](sequelize);
}


// Add hooks

// var User = sequelize.models.user;
// User.addHook('beforeSave', (user) => {
//     console.log('from hook');
//     console.log(user.password);
//     var salt = crypto.randomBytes(16).toString('hex');
//     crypto.pbkdf2(user.password, salt, 513, 59, 'SHA256', (error, hash) => {
//         if (error) {
//             throw new Error('Password hash was not created');
//         }
//         var password = `${salt}:${hash.toString('hex')}`;
//         user.password = password;
//         console.log(user.password);
//     });
// });

relations(sequelize);


module.exports = sequelize;