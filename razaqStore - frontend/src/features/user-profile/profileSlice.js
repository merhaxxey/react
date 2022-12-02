import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    displayCloseAccount: false,
    displayViewMore: '',
    isLoading: true,
    currentUser: {},
    googleLoginDetails: {}    
}

export const getUser = createAsyncThunk('profile/getCurrentUser', async()=>{
    try{
        const currentUser = await axios.get(`/api/v1/profile/showMe`)
        console.log('-----------------------------------', currentUser)

        return currentUser
    }
    catch(error){
        console.log(error)
    }
})


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDisplayCloseAccount: (state, action)=>{
            state.displayCloseAccount = action.payload
        },
        setGoogleLoginDetails: (state, action)=>{
            state.googleLoginDetails = action.payload
        },
        setDisplayViewMore: (state, action)=>{
            state.displayViewMore = action.payload
        }
    },
    extraReducers: {
        [getUser.pending]:(state, action)=>{
            state.isLoading = true
        },
        [getUser.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.currentUser = action.payload.data.user
        },
        [getUser.rejected]:(state, action)=>{
            state.isLoading = false
        }
    }

})

export const {setDisplayCloseAccount, setDisplayViewMore, setGoogleLoginDetails} = profileSlice.actions
export default profileSlice.reducer