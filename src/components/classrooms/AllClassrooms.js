import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import CreateClassroom from "./CreateClassroom";
import {logout} from '../login/loginSlice'
import { clearClassrooms } from "./classroomsSlice";
import { clearAssignments } from "../assignments/assignmentsSlice";


function AllClassrooms (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classrooms = useSelector(state=>state.classrooms).classrooms
    const teacher = useSelector(state=>state.teacher).teacher
    useEffect(()=>{},[dispatch])
    return(<div>
        { classrooms ? <div className="classroomsContainer">
            {classrooms.map((classroom) => <div key={classroom.id} className="classroomContainer">
                <h1>{classroom.name}</h1>
                <Link to ={`/classrooms/${classroom.id}`}>
                    <h4>View Seating Chart and Add Students</h4>
                </Link>
                <Link to={`/gradeAssignments/${classroom.id}`}>
                    <h4>Grade Assignments</h4>
                </Link>
                <h4>Has {classroom.students.length} students</h4>
                
            </div>
            )}
            {teacher.id ? <div className="createContainer"><CreateClassroom/></div>:null}
        </div>:null}/</div>
    )
}

export default AllClassrooms