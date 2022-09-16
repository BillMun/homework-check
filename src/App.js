import React from "react";
import {Routes, Route} from 'react-router-dom'
import LoginPage from "./components/login/LoginPage";
import SingleClassroom from "./components/classrooms/SingleClassroom";
import SingleAssignment from "./components/assignments/SingleAssignment";
import NavBar from "./components/navBar/navBar";
import AllClassrooms from "./components/classrooms/AllClassrooms";
import AllAssignments from "./components/assignments/AllAssignments";
import CreateNewAssignment from "./components/assignments/CreateNewAssignment";
import GradeAssignments from "./components/classrooms/GradeAssignments";

function App(){
    return(
        <div id='main'>
            <NavBar/>
            <Routes>
                <Route index element = {<LoginPage/>}/>
                <Route path ={'/classrooms'} element={<AllClassrooms/>}/>
                <Route path = {'/assignments'} element= {<AllAssignments/>}/>
                <Route path = {`/api/auth/:id/classrooms`} element={<SingleClassroom/>}/>
                <Route path = {`/api/auth/:id/assignments`} element={<SingleAssignment/>}/>
                <Route path={`/api/auth/:id/gradeAssignments`} element={<GradeAssignments/>}/>
                <Route path={`/assignments/create`} element={<CreateNewAssignment/>}/>
            </Routes>
        </div>

    )
}

export default App;