const db = require('./database')
const Sequelize = require('sequelize')

const Assignment = db.define('assignment',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    dueDate:{
        type: Sequelize.DATEONLY,
        allowNull:false,
        default: Sequelize.NOW
    }
})

module.exports = Assignment