const router = require('express').Router()
const Teacher = require('../db/teacher')

router.post('/', async (req,res,next)=>{
    try{
        const newUser = await Teacher.create(req.body)
        res.status(201).send(newUser)
    }catch(ex){next(ex)}
})

module.exports = router