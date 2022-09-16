const db = require('./database')
const Sequelize = require('sequelize')

const Student = db.define('student', {
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    row: {type:Sequelize.INTEGER},
    col: {type: Sequelize.INTEGER},
})

module.exports=Student