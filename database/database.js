const dbEnvVariable = require('dotenv').config()

const Sequelize = require('sequelize');

const connection = new Sequelize('questionsandanswers', 'root', dbEnvVariable.parsed.DB_PASSWORD, {
    host: 'localhost',
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
});

module.exports = connection;
