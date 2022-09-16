import axios from 'axios'

const TEACHER_LOGIN = 'TEACHER_LOGIN'
const GET_CLASSROOMS = 'GET_CLASSROOMS'
const GET_ASSIGNMENTS = 'GET_ASSIGNMENTS'

//action creators
function teacherLoginAction (teacher){
    return {type: TEACHER_LOGIN, teacher}
}

function getClassroomsAction(classrooms){
    return {type: GET_CLASSROOMS, classrooms}
}

function getAssignmentsAction(assignments){
    return {type: GET_ASSIGNMENTS, assignments}
}


//reducers
export const TeacherReducer = (state={}, action)=>{
    switch(action.type){
        case TEACHER_LOGIN:
            return action.teacher
    default: return state}
}

export const ClassroomReducer = (state=[], action)=>{
    switch(action.type){
        case GET_CLASSROOMS:
            return action.classrooms
        default: return state
    }
}

export const AssignmentReducer = (state=[], action)=>{
    switch(action.type){
        case GET_ASSIGNMENTS:
            return action.assignments
        default: return state
    }
}

export function getClassrooms(){
    return async function getAllClassroomsThunk(dispatch){
        const token = window.localStorage.getItem('token')
        if(token){
            const {data:auth} = await axios.get('/api/auth',{
                headers:{
                    authorization:token
                }
            })
            const {id}=auth
        const {data:classrooms} = await axios.get(`/api/auth/${id}/classrooms`,{
            headers:{
                authorization:token
            }
        })
        dispatch(getClassroomsAction(classrooms))
        }
    }
}

export function getAssignments(){
    return async function getAllAssignmentsThunk(dispatch){
        const token = window.localStorage.getItem('token')
        if(token){
            const {data:auth} = await axios.get('/api/auth',{
                headers:{
                    authorization:token
                }
            })
            const {id}=auth
        const {data:assignments} = await axios.get(`/api/auth/${id}/assignments`,{
            headers:{
                authorization:token
            }
        })
        dispatch(getAssignmentsAction(assignments))
        }
    }
}


export function teacherLogin (credentials){
    return async function teacherLoginThunk (dispatch){
        const response = await axios.post('/api/auth', credentials )
        const token = response.data
        window.localStorage.setItem('token',token)
        if(token){
            const {data:auth} =await axios.get('/api/auth',{
                headers:{
                    authorization:token
                }
            })
            const {id} = auth
            const {data:teacher} = await axios.get(`/api/auth/${id}/teachers`,{
                headers:{
                    authorization:token
                }
            })
            const {data:classrooms}=await axios.get(`/api/auth/${id}/classrooms`,{
                headers:{
                    authorization:token
                }
        })
        const {data:assignments} = await axios.get(`/api/auth/${id}/assignments`,{
            headers:{
                authorization:token
            }
        })
        dispatch(teacherLoginAction(teacher))
        dispatch(getClassroomsAction(classrooms))
        dispatch(getAssignmentsAction(assignments))
    }else console.log('login failed')
    }
}

