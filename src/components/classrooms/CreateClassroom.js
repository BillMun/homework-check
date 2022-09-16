import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { getClassrooms } from "../../store/redux";

function CreateClassroom (){
    const teacher = useSelector(state=>state.teacher)
    const [newClassroom, setNewClassroom] = useState({teacherId:teacher.id, rows:1, cols:1})
    const dispatch = useDispatch()
    
    useEffect(()=>{},[submit])

    const [submit, newSubmit] = useState(false)

    let arr = [1,2,3,4,5,6,7]
    const handleClickRow = (event)=>{
        setNewClassroom({
            ...newClassroom,
            rows:event.target.value
        })
    }
    const handleClickCol = (event)=>{
        setNewClassroom({
            ...newClassroom,
            cols:event.target.value
        })
    }
    const handleChange = props => event=>{
        setNewClassroom({
            ...newClassroom,
            [props]:event.target.value
        })
    }
    const createClassroom = async(classroom)=>{
        let newClass = await axios.post('/api/classroom', classroom)
        return newClass
    }
    const handleSubmit =(event)=>{
        event.preventDefault()
        createClassroom(newClassroom)
        dispatch(getClassrooms())
        newSubmit(!submit)
    }
    return (<div>Create a new Classroom
        <form onSubmit = {handleSubmit}>
            <label className="small">Class Name</label>
                <input className="studentName" type ='text' onChange={handleChange('name')}/>
            <label className="small">how many desk rows?</label>
            <select className='button' onClick = {handleClickRow}>
                {arr.map(elem=><option key={elem} value ={elem}>{elem}</option>)}
            </select>
            <div></div>
            <label className="small">how many desk columns?</label>
            <select className='button' onClick = {handleClickCol}>
                {arr.map(elem=><option key={elem} value ={elem}>{elem}</option>)}
            </select>
            <button className="button" type="submit">Submit</button>
        </form>
        </div>
    )
}
export default CreateClassroom