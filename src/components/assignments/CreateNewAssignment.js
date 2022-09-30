import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { getAssignments } from "./assignmentsSlice";
import { getClassrooms } from "../classrooms/classroomsSlice";
import Option from "./Option";

function CreateNewAssignment (){
    const dispatch = useDispatch()
    const teacher = useSelector(state=>state.teacher).teacher
    const classrooms = useSelector(state=>state.classrooms).classrooms
    const [whichClass,setwhichClass]=useState([])

    
    useEffect (()=>{},[submit])
    
    const [submit,newSubmit]= useState(false)

    const [newAssignment, setNewAssignment]=
    useState({teacherId:teacher.id})

    const createNewAssignment = async(assignment)=>{
        const createdAssignment = await axios.post('/api/assignment', assignment)
        return createdAssignment
    }

    const handleChange = props => event=> {
        setNewAssignment({
            ...newAssignment,
            [props]:event.target.value
        })
    }
    const handleOptionChange = (event)=>{
        setwhichClass({...whichClass, classroomId:event})
    }

    const options = classrooms.map(classroom=>{
        let obj = {value: classroom.id, label: classroom.name}
        return obj
    })

    const createAssignClass = async (obj)=>{
        const createdAssignClass = await axios.post('/api/assignmentClassroom',obj)
        return createdAssignClass
    }
    const createStudentAssign = async (obj)=>{
        const createStudentAssign = await axios.post(`/api/studentAssignment`, obj)
        return createStudentAssign
    }
    
    const handleClick = async ()=>{
        let {data} = await createNewAssignment(newAssignment)
        whichClass.classroomId
        .forEach(async elem=>await createAssignClass({assignmentId:data.id, classroomId:elem.value}))
        let classroom = classrooms.filter(o1=> whichClass.classroomId.some(o2=>o1.id==o2.value))
        console.log(classroom)
        classroom.forEach(elem=>elem.students.forEach(async elem=>await createStudentAssign({assignmentId: data.id, studentId: elem.id})))
        dispatch(getAssignments())
        dispatch(getClassrooms())
        newSubmit(!submit)
    }
    return(<div>Create New Assignment
        {teacher.id ?<div>
            <label className="small">Assignment Name</label>
                <input className="studentName" type='text' onChange={handleChange('name')}/>
            <label className="small">Due Date:</label>
                <input type = 'date' onChange={(handleChange('dueDate'))}/>
           <Select options = {options}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            allowSelectAll={true}
            onChange={handleOptionChange}
            components={{Option}}
            />          
            <button className="button" type='submit' onClick={handleClick}>Submit</button>
            </div>
        :null}
    </div>)
}

//please note I tried for a very long time to use /form and onsubmit. I kept getting a very strange bug.
//for that reason I refactored this to do a onClick on the button.

export default CreateNewAssignment