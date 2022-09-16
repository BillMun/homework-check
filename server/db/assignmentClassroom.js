db = require('./database')
const {Sequelize, DataTypes} = require('sequelize')

const AssignmentClassroom = db.define('assignmentClassroom',{
    id:{type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull:false}})

module.exports = AssignmentClassroom