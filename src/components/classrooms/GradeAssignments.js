import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import StudentGrade from "./StudentGrade";

function GradeAssignments (){
    const params = useParams()
    const classrooms = useSelector(state=>state.classrooms)
    const assignments = useSelector(state=>state.assignments)
    const [assignId, setAssignId]= useState('')
    const [grading, setGrading]=useState(false)
    let classroom = classrooms.filter(elem => {if(elem.id==params.id) return true})[0]
    const seatingChart = (rows, columns)=>{
        let newArr = []
        for(let i = 0; i <columns;i++){
            newArr.push([])
            for(let j = 0;j <rows;j++){
                newArr[i].push(` Unassigned Seat `)
            }
        }
        return newArr
    }
    useEffect(()=>{},[grading])
    const assignment = assignments.filter(elem => {if(elem.id==assignId) return true})[0]
    const seats = seatingChart(classroom.rows, classroom.cols)
    classroom.students.forEach(elem=>seats[elem.row][elem.col]=elem)
    return(
        <div>
            <h1>{classroom.name}</h1>
            <select onClick={(event)=>{
                setAssignId(Number(event.target.value))
                if(event.target.value==-1){setGrading(false)}
                else{setGrading(false)
                    setTimeout(()=>{setGrading(true)},1)
                    }
            }}>
                <option value='-1'>None</option>
                {classroom.assignmentClassrooms.map(elem=>
                    <option key={elem.assignment.id} value={elem.assignment.id}>
                        {elem.assignment.name}</option>)}
            </select>
            <div className = 'outerContainer'>
            {classroom.id ? <>
                {seats.map((seat, row) =>
                    <div key={row} className="contentContainer">
                    {seat.map((student, col) => 
                    <div key={col} value={{row,col}} className="studentContainer">
                        {student.name ? <div> <h4>{student.name}</h4>
                        <hr/>{grading ? <StudentGrade row={row} col={col} students={classroom.students} assignment={assignment}/>:null}
                        </div> : 
                        <div className="small">Unassigned Seat
                        <hr/>
                        </div> }  
                    </div> )}
                </div>)}</>:null}
            </div>
        </div>
    )
}
export default GradeAssignments