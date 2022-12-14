import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import CreateNewAssignment from "./CreateNewAssignment";

function AllAssignments (){
    const assignments = useSelector(state=>state.assignments).assignments
    const teacher = useSelector(state=>state.teacher).teacher
    return(<div>
        {teacher.id ? <div> {assignments.length ? <ol className="innerContainer">{assignments.map(
            assignment => <li key={assignment.id}><Link to={`/assignments/${assignment.id}`}>{assignment.name}</Link></li>)}
            </ol>:null}
            <CreateNewAssignment/></div>:null}
        </div>
    )
}

export default AllAssignments