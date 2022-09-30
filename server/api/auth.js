const router = require('express').Router()
const {Teacher, Student, Classroom, Assignment, AssignmentClassroom, StudentAssignment} = require('../db/index')


const requireToken = async (req,res,next)=>{
    try{
        const token = await req.headers.authorization
        const teacher = await Teacher.byToken(token)
        req.teacher = teacher
        next()
    }catch(error){next(error)}
}
//api/auth
router.post('/', async (req,res,next)=>{
    try{
        const teacher = await Teacher.authenticate(req.body)
        if(!teacher) res.sendStatus(404)
        const token = await teacher.generateToken()
        res.send(token)
    }catch(ex){next(ex)}
})

router.get('/', requireToken, async(req,res,next)=>{
    if(req.teacher){
        res.send(req.teacher)

    }else{
        res.send('/api/get did not work')
    }
})

router.get('/:id/classrooms', requireToken, async (req,res,next)=>{
    try{
        const teacherClassrooms = await Classroom.findAll({
            include:[
                {model:Student, include:[{model:StudentAssignment, include:{model:Assignment}}]},
                {model:AssignmentClassroom, include:Assignment}],
            where:{
                teacherId:req.params.id
            }
        })
        res.send(teacherClassrooms)
    }catch(error){next(error)}
})

router.get(`/:id/teachers`, requireToken, async(req,res,next)=>{
    try {const teacher = await Teacher.findByPk(req.params.id, {
    })
    res.send(teacher)}
    catch(error){next(error)}
    })

router.get(`/:id/assignments`, requireToken, async(req,res,next)=>{
    try {
        const teacherAssignments = await Assignment.findAll({
            include: [{model:StudentAssignment, include:Student},
                {model:AssignmentClassroom, include:Classroom}],
            where:{
                teacherId:req.params.id
            }
        })
        res.send(teacherAssignments)
    }catch(error){next(error)}
})

module.exports = router