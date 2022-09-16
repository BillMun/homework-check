import React,{useState} from "react";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import CreateAndAssign from "./CreateAndAssign";

function SingleClassroom (){
    const params = useParams()
    const [addStudents,toggleAdd]=useState(false)
    const classrooms = useSelector(state=>state.classrooms)
    
    let classroom = classrooms.filter(elem => {if(elem.id==params.id) return true})[0]
    console.log(classroom)
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

    const seats = seatingChart(classroom.rows, classroom.cols)
    classroom.students.forEach(elem=>seats[elem.row][elem.col]=elem)
    return(
        <div>
            <h1>{classroom.name}</h1>
            <button onClick={()=>!toggleAdd(!addStudents)}>
                {addStudents ? 'view chart' : 'add students'}
                </button>
            <span></span>
            <div className = 'outerContainer'>
            {classroom.id ? <>
                {seats.map((seat, row) =>
                    <div key={row} className="contentContainer">
                    {seat.map((student, col) => 
                    <div key={col} className="studentContainer">
                        {student.name ? student.name : 
                        <div className="small">Unassigned Seat
                        <hr/>
                        {addStudents ? <CreateAndAssign row={row} col={col} classroomId={classroom.id}/>:null}
                        </div> }  
                    </div> )}
                </div>)}</>:null}
            </div>
        </div>
    )
}
export default SingleClassroom