db = require('./database')
const {Sequelize, DataTypes} = require('sequelize')

const StudentAssignment = db.define('studentAssignment',{
    id:{type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull:false},
    completed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }})

module.exports = StudentAssignment