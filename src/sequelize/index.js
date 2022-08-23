var { Sequelize } = require('sequelize');
var { DIALECT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
var sequileze = new Sequelize(`${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);

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