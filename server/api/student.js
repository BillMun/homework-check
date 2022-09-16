const router = require('express').Router()
const {Student} = require('../db/index')

router.post('/', async (req,res,next)=>{
    try{
        let newStudent = await Student.create(req.body)
        res.status(201).send(newStudent)
    }catch(error){next(error)}
})

module.exports = router