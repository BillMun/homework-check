import axios from "axios";
import React, {useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import {getAssignments, getClassrooms} from '../../store/redux'


function StudentGrade (props){
    const dispatch = useDispatch()
    let student = props.students.
    filter(elem =>{if(elem.row==props.row && elem.col==props.col) return true})[0]
    let assignment = props.assignment.studentAssignments.filter(elem=>{
        if(elem.student.row==props.row && elem.student.col==props.col)   return true} 
    )[0]
    const [completed, setCompleted]=useState(false)
    useEffect(()=>{
        if(assignment){
            setCompleted(assignment.completed)
        }else{setCompleted(false)}
    },[])   
    const updateComplete = async (obj)=>{
        const updatedAssign = await axios.put(`/api/studentAssignment/${obj.id}`, obj)
        return updatedAssign
    }
    return(
        <button onClick={async ()=>{
            setCompleted(!completed)
            let {data}= await updateComplete({id:assignment.id, completed:!completed})
            dispatch(getAssignments())
            dispatch(getClassrooms())
        }}>{completed ? <p>complete</p>:<p>missing</p>}
        </button>
    )
}

export default StudentGrade