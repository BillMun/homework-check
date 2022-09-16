import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getClassrooms, getAssignments } from "../../store/redux";

function CreateAndAssign (props){
    const dispatch = useDispatch()
    useEffect(()=>{
    },[submit])

    const [submit, newSubmit] = useState(false)
    const[newStudent, setNewStudent] = useState({row:props.row, col:props.col, classroomId:props.classroom.id})
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
    console.log(props.classroom)
    const handleSubmit =async (event)=>{
        event.preventDefault()
        let {data}= await createStudent(newStudent)
        props.classroom.assignmentClassrooms.forEach(async elem=>
            await studentAssigns({studentId:data.id, assignmentId:elem.assignment.id}))
        dispatch(getClassrooms())
        dispatch(getAssignments())
        newSubmit(!submit)
    }

    return(
        <form onSubmit = {handleSubmit}>
            <label>
                Create and Assign Student
                <input className="studentName" type='text' 
                onChange={handleChange('name')} name='name'/>
                <button className="button" type='submit'>Create
                </button>
            </label>
        </form>
    )
}

export default CreateAndAssign