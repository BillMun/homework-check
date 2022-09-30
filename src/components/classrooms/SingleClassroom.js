import React,{useState} from "react";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import CreateAndAssign from "./CreateAndAssign";
import {ExcelRenderer, OutTable} from 'react-excel-renderer'

function SingleClassroom (){
    const params = useParams()
    const [addStudents,toggleAdd]=useState(false)
    const [excel, setExcel] = useState({dataLoaded:false, rows:null, cols:null})
    const classrooms = useSelector(state=>state.classrooms).classrooms
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
    const fileHandler = (event) =>{
        let fileObj = event.target.files[0]
        ExcelRenderer(fileObj, (err,resp)=>{
            if(err){
                console.log(err)
            }else{
                setExcel({
                dataLoaded:true,
                cols: resp.cols,
                rows: resp.rows
                })
            }
        })
    }

    const seats = classrooms.length ? seatingChart(classroom.rows, classroom.cols) : []
    const seating = classrooms.length ? classroom.students.forEach(elem=>seats[elem.row][elem.col]=elem):[]
    return(
        <div> { classrooms.length ? <div>
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
                        {addStudents ? <CreateAndAssign row={row} col={col} data={excel.rows} classroom={classroom}/>:null}
                        </div> }  
                    </div> )}
                </div>)}</>:null}
            </div><input type='file' onChange={fileHandler}/>
            {excel.dataLoaded ? <OutTable data={excel.rows} columns = {excel.cols} tableClassName='ExcelTable2007' tableHeaderRowClass='heading' />
            :null}
            </div> : null}
        </div>
    )
}
export default SingleClassroom