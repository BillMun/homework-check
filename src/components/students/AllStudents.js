import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function AllStudents () {
    const classrooms = useSelector(state=>state.classrooms).classrooms
    const [classroom, setClassroom] = useState({})

    const handleClick = (event) => {
        setClassroom(classrooms.filter(classroom => classroom.id==event.target.value)[0])
    }
    return(
        <div>
            <select onClick={handleClick}>
                {classrooms.map(classroom=><option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                </option>)}
            </select>
            <div>
            {classroom.id ? <div> <h3>View Assignments for</h3>
            <ol>
                {classroom.students.map(student=>
                <Link key={student.id} to ={`/students/${student.id}/${classroom.id}`}>
                <li>{student.name}</li>
                </Link>)}
            </ol></div>:null}
            </div>
        </div>
    )
}

export default AllStudents