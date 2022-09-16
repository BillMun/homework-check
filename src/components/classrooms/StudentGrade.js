import React, {useState,useEffect} from "react";


function StudentGrade (props){
    let student = props.students.
    filter(elem =>{if(elem.row==props.row && elem.col==props.col) return true})[0]
    let assignment = props.assignment.studentAssignments.filter(elem=>{
        if(elem.student.row==props.row&&elem.student.col==props.col)   return true} 
    )[0]
    const [completed, setCompleted]=useState(false)
    useEffect(()=>{
        if(assignment){
            setCompleted(assignment.completed)
        }else{setCompleted(false)}
    },[])
    return(
        <button onClick={()=>!setCompleted(!completed)}>{completed ? <p>complete</p>:<p>missing</p>}
        </button>
    )
}

export default StudentGrade