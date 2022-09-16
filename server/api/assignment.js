const router = require('express').Router()
const {Assignment} = require('../db/index')

router.post('/', async (req,res,next)=>{
    try{
        console.log(req.body)
        let assignment = await Assignment.create(req.body)
        res.status(201).send(assignment)
    }catch(error){next(error)}
})

module.exports = router