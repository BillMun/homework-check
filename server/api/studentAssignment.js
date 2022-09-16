const router = require('express').Router()
const {StudentAssignment} = require('../db/index')

router.post('/', async (req,res,next)=>{
    try{
        console.log(req.body)
        let studentAssign = await StudentAssignment.create(req.body)
        res.status(201).send(studentAssign)
    }catch(error){next(error)}
})

router.put('/:id',async(req,res,next)=>{
    try{const studentAssignment = await StudentAssignment.findByPk(req.params.id)
        console.log(req.body)
      res.send(await studentAssignment.update(req.body))  
    }catch(error){next(error)}
})

module.exports = router