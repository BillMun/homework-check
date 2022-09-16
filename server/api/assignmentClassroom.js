const router = require('express').Router()
const {AssignmentClassroom} = require('../db/index')

router.post('/', async (req,res,next)=>{
    try{
        console.log(req.body)
        let assignmentClass = await AssignmentClassroom.create(req.body)
        res.status(201).send(assignmentClass)
    }catch(error){next(error)}
})

module.exports = router