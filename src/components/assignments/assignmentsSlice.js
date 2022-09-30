import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    assignments: [],
    status: 'idle',
}

export const getAssignments = createAsyncThunk('assignments/getAssignments', async()=>{
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
        }})
        return {assignments}
    }else {let assignments = []
    return assignments}
})

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        clearAssignments:(state)=>{
            state.assignments = []
            state.status = 'idle'
        }
    },
    extraReducers(builder){
        builder
            .addCase(getAssignments.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.assignments = action.payload.assignments
            })
    }
})

export default assignmentsSlice.reducer
export const { clearAssignments } = assignmentsSlice.actions;