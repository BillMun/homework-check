import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    :null


const initialState = {
    loggedIn:false,
    teacher:{},
    token
}

export const checkToken = createAsyncThunk('teacher/auth/token', async()=>{
    const token = localStorage.getItem('token')
    if(token){
        const {data:auth} = await axios.get('/api/auth', {
            headers:{
                authorization:token
            }
        })
        const {id} = auth
        const {data : teacher } = await axios.get(`/api/auth/${id}/teachers`,{
            headers: {
                authorization:token
            }
        })
        return {teacher, token, loggedIn:true}
    } else { let teacher = {}
    localStorage.removeItem('token')
    return { teacher, token:null, loggedIn:false}}
})

export const teacherLogin = createAsyncThunk('teacher/auth', async (credentials)=>{
    try{
        const response = await axios.post('/api/auth', credentials)
        const token = response.data
        window.localStorage.setItem('token',token)
        if(token){
            const {data:auth} = await axios.get('/api/auth', {
                headers: {
                    authorization:token,
                }
            })
            const {id} = auth
            const { data: teacher} = await axios.get(`/api/auth/${id}/teachers`,{
                headers :{
                    authorization: token,
                }
            })
            return { teacher, token}
        } else { throw 'login Failed bad credentials'}
    }
    catch(e){
        console.log(e)
    }
})

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        logout: (state) =>{
            localStorage.removeItem('token')
            state.loading = false
            state.teacher = {}
            state.token = null
            state.error = null
            state.loggedIn = false
        },
    },
    extraReducers(builder){
        builder
            .addCase(teacherLogin.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = true
                state.teacher = action.payload.teacher
                state.token = action.payload.token
            })
  
            .addCase(checkToken.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = action.payload.loggedIn
                state.token = action.payload.token
                state.teacher = action.payload.teacher
            })
    }
})

export const {logout} = loginSlice.actions
export default loginSlice.reducer