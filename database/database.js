const dbEnvVariable = require('dotenv').config()
debugger

const Sequelize = require('sequelize');

debugger
const connection = new Sequelize('questionsandanswers', 'root', dbEnvVariable.parsed.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
