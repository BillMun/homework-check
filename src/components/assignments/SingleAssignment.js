import React from "react";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
function SingleAssignment (){
    const params = useParams()
    const assignments = useSelector(state=>state.assignments)
    let assignment = assignments.filter(elem=>{if(elem.id==params.id)return true})
    return(
        <div>
            {assignment.map(elem =><div key={elem.id}>
            <h4>{elem.name}</h4>
            <p>Due Date {elem.dueDate}</p>
            <ul>Assigned to:{elem.assignmentClassrooms.map(classroom =>
                <li key={classroom.classroom.id}>{classroom.classroom.name}</li>)}
                </ul>
            </div>)}
        </div>
    )
}

export default SingleAssignment
