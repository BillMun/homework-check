import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getAssignments } from "../assignments/assignmentsSlice";
import { getClassrooms } from "./classroomsSlice";

function CreateAndAssign (props){
    const dispatch = useDispatch()
    useEffect(()=>{},[submit])
    const [submit, newSubmit] = useState(false)
    const handleChange = props => event =>{
        setNewStudent({
            ...newStudent,
            [props]:event.target.value,
        })
    }
    const createStudent = async (student)=>{
        let createStudent = await axios.post('/api/student', student)
        return createStudent
    }
    const studentAssigns = async (obj)=>{
        let studentAssignCreate = await axios.post(`/api/studentAssignment`,obj)
    }
    const handleSubmit =async (event)=>{
        event.preventDefault()
        newStudent.name ? newStudent.name : newStudent.name = students[0]
        let {data}= await createStudent(newStudent)
        props.classroom.assignmentClassrooms.forEach(async elem=>
            await studentAssigns({studentId:data.id, assignmentId:elem.assignment.id}))
        dispatch(getClassrooms())
        dispatch(getAssignments())
        newSubmit(!submit)
    }
    let currentStudents = props.classroom.students.map(student => student.name)
    let students = props.data ? props.data.map((student,index)=>{
        if(index>1){
            return `${student[0]}${student[1] ? ` ${student[1]}`:''}`
        }else return null
    }).filter(elem => elem).filter(elem => !currentStudents.includes(elem)):null
    const[newStudent, setNewStudent] = useState({
            row:props.row, col:props.col, classroomId:props.classroom.id})
    
    return(
        <form onSubmit = {handleSubmit}>
            <label className="small">
                Assign Student
                <input className="studentName" type='text' 
                onChange={handleChange('name')} name='name'/>
                {props.data ? <select defaultValue={students[0]} onChange={handleChange('name')}>
                {students.map(student=><option className="studentName" value ={student}>{student}</option>)}
                </select>:null}
                <button className="button" id='createStudent' type='submit'>Create
                </button>
            </label>
        </form>
    )
}

export default CreateAndAssign