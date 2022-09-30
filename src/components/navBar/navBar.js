import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import { clearAssignments } from "../assignments/assignmentsSlice";
import { clearClassrooms } from "../classrooms/classroomsSlice";
import {logout} from '../login/loginSlice'
import { useDispatch, useSelector } from "react-redux";



function NavBar () {
    const teacher = useSelector(state=> state.teacher).teacher
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return(
        <div className='navbar'>
            { teacher.id ? <button onClick={()=>{
                dispatch(logout())
                dispatch(clearClassrooms())
                dispatch(clearAssignments())
                navigate('/')
            }}>Logout</button>:
            <button onClick={()=>{
                navigate('/')
            }}>Sign In
            </button>}
            <Link id='navItem' to = '/classrooms'>Classrooms </Link>
            <Link id='navItem' to = '/assignments'>Assignments </Link>
            <Link id='navItem' to = '/students'>Students</Link>
        </div>
    )
}
export default NavBar