import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { teacherLogin } from "./loginSlice";
import AllClassrooms from "../classrooms/AllClassrooms";
import { getClassrooms } from "../classrooms/classroomsSlice";
import { getAssignments } from "../assignments/assignmentsSlice";
import {Link} from 'react-router-dom'


function LoginPage (){
    const [login, setLogin] = useState({})
    const dispatch =useDispatch()
    const teacher = useSelector(state=>state.teacher).teacher
    useEffect(()=>{},[login])
    const handleChange = props=>event=>{
        setLogin({
            ...login,
            [props]:event.target.value
        })
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        await dispatch(teacherLogin(login))
        await dispatch(getClassrooms())
        await dispatch(getAssignments())
    }

    return(
    <div>
        {teacher.id ? <div className="outerContainer"> 
        <AllClassrooms/></div> :
        <div className="outerContainer">
            <img src = 'https://img.freepik.com/premium-photo/empty-white-classroom-background-with-green-chalkboard-table-seat-wooden-floor_10307-1501.jpg?w=2000' />
        <div className="innerContainer">
            <div className="loginContainer">
                <h3>
                Welcome to Homework Checker. Please log in!
                </h3>
                <form className="login" onSubmit={handleSubmit}>
                    <label>Email</label>
                        <input type='text' onChange={handleChange('email')} name='email'/>
                    <label>Password</label>
                        <input type='password' onChange ={handleChange('password')} name='password'/>
                    <button type='submit'>Login</button>
                </form>
                <Link to ='/signup'>
                <h3>Sign Up!</h3>
                </Link>
            </div>
        </div>
        </div>}
    </div>)
}

export default LoginPage