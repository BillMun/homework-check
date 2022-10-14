const db= require('./database')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Teacher = db.define('teacher',{
    name:{
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

Teacher.prototype.generateToken = async function (){
    try{
        const token = await jwt.sign({id: this.id}, process.env.JWT)
        return token
    }catch(err) {console.log(err)}
}

Teacher.byToken = async function (token){
    try{
        const payload = await jwt.verify(token, process.env.JWT)
        if (payload) {
            const teacher = await Teacher.findByPk(payload.id)
            return teacher
        }
        const error = Error('bad credentials')
        error.status = 401
        throw error
    }catch(ex){
        const error = Error('bad credentials')
        error.status = 401
        throw error
    }
}

Teacher.authenticate = async ({email, password})=>{
    const teacher = await Teacher.findOne({
        where:{
            email
        }
    })
    const match = await bcrypt.compare(password, teacher.password)
    if(match){return teacher}
    const error = Error('bad credentials')
    error.status = 401
    throw error
}

Teacher.addHook('beforeCreate', async(teacher)=>{
    if(teacher.changed('password')){
        teacher.password = await bcrypt.hash(teacher.password,3)
    }
})

module.exports=Teacher