const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/homework-check', { logging: false });

module.exports = db;
