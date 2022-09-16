db = require('./database')
const Sequelize = require('sequelize')

const Classroom = db.define('classroom', {
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    rows:{type: Sequelize.INTEGER},
    cols:{type: Sequelize.INTEGER}
})

module.exports = Classroom