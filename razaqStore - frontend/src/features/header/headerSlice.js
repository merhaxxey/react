import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    toggleSidebar: false,
    isLoading: true,
    user: {}
}

export const getCurrentUser = createAsyncThunk('header/getCurrentUser', async()=>{
    try{
        const user = await axios.get('/api/v1/user/showMe')
        return user
    }
    catch(error){

    }
})


const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers:{
        setToggleSidebar: (state, action)=>{
            state.toggleSidebar = !state.toggleSidebar
        }
    },
    extraReducers:{
        [getCurrentUser.pending]: (state)=>{
            state.isLoading = true
        },
        [getCurrentUser.fulfilled]: (state, action)=>{
            console.log(action)
            state.user = action.payload?.data?.user
            state.isLoading = false
        },
        [getCurrentUser.rejected]: (state)=>{
            state.isLoading = false
        }
    }
})

export const {setToggleSidebar} = headerSlice.actions
export default headerSlice.reducer