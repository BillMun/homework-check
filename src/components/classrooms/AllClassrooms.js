import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import CreateClassroom from "./CreateClassroom";

function AllClassrooms (){
    const classrooms = useSelector(state=>state.classrooms)
    const teacher = useSelector(state=>state.teacher)
    return(
        <div className="innerContainer">
            {classrooms.map((classroom) => <div key={classroom.id} className="classroomContainer">
                <h1>{classroom.name}</h1>
                <Link to ={`/api/auth/${classroom.id}/classrooms`}>
                    <h4>View Seating Chart and Add Students</h4>
                </Link>
                <Link to={`/api/auth/${classroom.id}/gradeAssignments`}>
                    <h4>Grade Assignments</h4>
                </Link>
                <h4>Has {classroom.students.length} students</h4>
                
            </div>
            )}
            {teacher.id ?<div className="createContainer"><CreateClassroom/></div>:null}
        </div>
    )
}

export default AllClassrooms