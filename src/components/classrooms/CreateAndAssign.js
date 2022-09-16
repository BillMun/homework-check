import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getClassrooms } from "../../store/Teacher";

function CreateAndAssign (props){
    const dispatch = useDispatch()
    useEffect(()=>{

    },[submit])

    const [submit, newSubmit] = useState(false)
    const[newStudent, setNewStudent] = useState({row:props.row, col:props.col, classroomId:props.classroomId})
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
    const handleSubmit =(event)=>{
        event.preventDefault()
        createStudent(newStudent)
        dispatch(getClassrooms())
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