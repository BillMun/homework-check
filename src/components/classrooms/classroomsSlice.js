import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    classrooms: [],
    status: 'idle'
}

export const getClassrooms = createAsyncThunk('classrooms/getClassrooms', async ()=>{
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
        return {classrooms}
    }else{let classrooms = [] 
        return classrooms}
})

const classroomsSlice = createSlice({
    name: 'classrooms',
    initialState,
    reducers: {
        clearClassrooms:(state)=>{
            state.classrooms=[]
            state.status = 'idle'
        }
    },
    extraReducers(builder){
        builder
            .addCase(getClassrooms.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.classrooms = action.payload.classrooms
            })
    }
})

export default classroomsSlice.reducer
export const { clearClassrooms } = classroomsSlice.actions;