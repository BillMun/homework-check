const db = require('./database')
const Student = require('./student')
const Classroom = require('./classroom')
const Assignment = require('./assignment')
const Teacher = require('./teacher')
const { Sequelize, DataTypes } = require('sequelize')
const AssignmentClassroom =require('./assignmentClassroom')
const StudentAssignment = require('./studentAssignment')

const syncAndSeed = async () => {
    await db.sync({ force: true });

    const munkacsy = await Teacher.create({
      name: 'Bill Munkacsy',
      email: 'example@gmail.com',
      password: '1234'
    })

    const block1 = await Classroom.create({
      name: 'Geometry Block 1',
      rows: 4,
      cols: 5,
      teacherId: munkacsy.id,
    })
    const block2 = await Classroom.create({
      name: 'Algebra II Block 2',
      rows: 3,
      cols: 4,
      teacherId: munkacsy.id
    })
    const sally = await Student.create({
      name: 'Sally',
      row: 0,
      col: 2,
      teacherId:munkacsy.id,
      classroomId:block1.id
    })
      
    const megan = await Student.create({name:'Megan',
        row:0,
        col:1,
        teacherId: munkacsy.id,
        classroomId: block1.id
    })
    const bill = await Student.create({name:'Bill', 
    row:2, col:2, 
    teacherId:munkacsy.id, classroomId:block1.id})

    const charlie = await Student.create({name:'Charlie', 
    row:1, col:0, 
    teacherId:munkacsy.id, classroomId:block1.id})

    const triangle = await Assignment.create({name:'Triangle Inequality', teacherId:munkacsy.id, dueDate:'2022-03-05'})
    const factor = await Assignment.create({name:'Factoring Quadratic Expressions', teacherId:munkacsy.id, dueDate:'2022-03-07',})
    await Assignment.bulkCreate([
      {name:'Sum and Difference of Cubes', teacherId:munkacsy.id, dueDate:'2022-03-07',},
      {name:'Factoring Polynomials', teacherId:munkacsy.id, dueDate:'2022-03-07',},
      {name:'Solving Polynomials by Factoring', teacherId:munkacsy.id, dueDate:'2022-03-07',}
    ])
    const assignments = await AssignmentClassroom.bulkCreate([
      {assignmentId:triangle.id, classroomId:block1.id}, 
      {assignmentId:factor.id, classroomId:block1.id},
      {assignmentId:factor.id, classroomId:block2.id},
    {assignmentId:3, classroomId:2},
  {assignmentId:4, classroomId:2},
  {assignmentId:5, classroomId:2}])
    
    const studentAssigns = await StudentAssignment.bulkCreate([
      {studentId:megan.id, assignmentId:triangle.id, completed:true},
      {studentId:charlie.id, assignmentId:triangle.id, completed:0},
      {studentId:bill.id, assignmentId:triangle.id, completed:1},
      {studentId:sally.id, assignmentId:triangle.id, completed:0},
      {studentId:megan.id, assignmentId:factor.id, completed:true},
      {studentId:charlie.id, assignmentId:factor.id, completed:0},
      {studentId:bill.id, assignmentId:factor.id, completed:1},
      {studentId:sally.id, assignmentId:factor.id, completed:0}
    ])

    console.log(`
    Seeding successful!
  `);
};

Classroom.belongsTo(Teacher)
Teacher.hasMany(Classroom)
Student.belongsTo(Classroom)
Classroom.hasMany(Student)
Student.hasMany(Assignment)
Classroom.hasMany(Assignment)
Assignment.belongsTo(Teacher)
Teacher.hasMany(Assignment)
Assignment.belongsToMany(Classroom, {through:AssignmentClassroom})
Assignment.belongsToMany(Student, {through:StudentAssignment})
AssignmentClassroom.belongsTo(Classroom)
AssignmentClassroom.belongsTo(Assignment)
Classroom.hasMany(AssignmentClassroom)
Assignment.hasMany(AssignmentClassroom)
Assignment.hasMany(StudentAssignment)
Student.hasMany(StudentAssignment)
StudentAssignment.belongsTo(Student)
StudentAssignment.belongsTo(Assignment)




module.exports = {
    db,
    syncAndSeed,
    Classroom,
    Teacher,
    Student,
    Assignment,
    AssignmentClassroom,
    StudentAssignment
}