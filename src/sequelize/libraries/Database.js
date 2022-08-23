var { Sequelize } = require('sequelize');
var config = process.env;
var sequileze = new Sequelize(`${config.DIALECT}://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:5432/${config.DB_NAME}`);

async function testDB() {
    try {
        sequileze.authenticate().then(() => {
            console.log("Connection to DB successfully");
        });
    } catch (e) {
        console.error("Unable to connect to DB", e);
    }
}

testDB();

module.exports = sequileze;