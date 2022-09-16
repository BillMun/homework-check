import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { teacherLogin } from "../../store/redux";
import AllAssignments from "../assignments/AllAssignments";
import AllClassrooms from "../classrooms/AllClassrooms";


function LoginPage (){
    const [login, setLogin] = useState({})
    const dispatch =useDispatch()
    const teacher = useSelector(state=>state.teacher)
    const classrooms = useSelector(state=>state.classrooms)
    const assignments = useSelector(state=>state.assignments)
    const handleChange = props=>event=>{
        setLogin({
            ...login,
            [props]:event.target.value
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(teacherLogin(login))
    }

    return(
    <div>
        {teacher.id ?<div className="outerContainer"> 
        <AllClassrooms/></div>:
        <div>
        <h3>
            Welcome to Homework Checker. Please log in!
        </h3>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
                <input type='text' onChange={handleChange('email')} name='email'/>
            <label>Password</label>
                <input type='text' onChange ={handleChange('password')} name='password'/>
            <button type='submit'>Login</button>
        </form>
        </div>}
    </div>)
}

export default LoginPage