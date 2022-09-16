
const router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/student', require('./student'))
router.use('/classroom', require('./classroom'))
router.use('/assignment', require('./assignment'))
router.use('/assignmentClassroom',require('./assignmentClassroom'))

module.exports = router;