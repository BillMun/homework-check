import React,{useEffect} from "react";
import {Routes, Route} from 'react-router-dom'
import LoginPage from "./components/login/LoginPage";
import SingleClassroom from "./components/classrooms/SingleClassroom";
import SingleAssignment from "./components/assignments/SingleAssignment";
import NavBar from "./components/navBar/navBar";
import AllClassrooms from "./components/classrooms/AllClassrooms";
import AllAssignments from "./components/assignments/AllAssignments";
import CreateNewAssignment from "./components/assignments/CreateNewAssignment";
import GradeAssignments from "./components/classrooms/GradeAssignments";
import { useDispatch } from "react-redux";
import { checkToken } from "./components/login/loginSlice";
import { getClassrooms } from "./components/classrooms/classroomsSlice";
import { getAssignments } from "./components/assignments/assignmentsSlice";
import AllStudents from "./components/students/AllStudents";
import SingleStudent from "./components/students/SingleStudent";

function App(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(checkToken())
        dispatch(getClassrooms())
        dispatch(getAssignments())
    },[])
    return(
        <div id='main'>
            <NavBar/>
            <Routes>
                <Route index element = {<LoginPage/>}/>
                <Route path ={'/classrooms'} element={<AllClassrooms/>}/>
                <Route path = {'/assignments'} element= {<AllAssignments/>}/>
                <Route path = {'/students'} element = {<AllStudents/>}/>
                <Route path = {`/classrooms/:id`} element={<SingleClassroom/>}/>
                <Route path = {`/assignments/:id`} element={<SingleAssignment/>}/>
                <Route path={`/gradeAssignments/:id`} element={<GradeAssignments/>}/>
                <Route path={`/assignments/create`} element={<CreateNewAssignment/>}/>
                <Route path={`/students/:studentId/:classroomId`} element ={<SingleStudent/>} />
            </Routes>
        </div>

    )
}

export default App;