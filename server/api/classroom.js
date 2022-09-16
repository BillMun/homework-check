const router = require('express').Router()
const {Classroom} = require('../db/index')

router.post('/', async (req,res,next)=>{
    try{
        let classroom = await Classroom.create(req.body)
        res.status(201).send(classroom)
    }catch(error){next(error)}
})

module.exports = router