import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {categories} from '../../categories'
import axios from 'axios'

const initialState = {
    categories,
    subCategoryIndex: 0,
    openSubCategory: false,
    windowWidth: window.innerWidth,
    firstRowSectionWidth: 0,
    products:[],
    isLoading: true,
    accountComponentsMsg: {}
}



export const getProducts = createAsyncThunk('home/getProducts',  async()=>{
    try {
        const products = await axios.get('/api/v1/product/')
        return products
        
    } catch (error) {
        
    }
})

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{
        setSubCategoryIndex: (state, action)=>{
            state.subCategoryIndex = action.payload
        },
        setOpenSubCategory: (state, action)=>{
            state.openSubCategory = action.payload
        },
        setWindowWidth: (state)=>{
            state.windowWidth = window.innerWidth
        },
        setFirstRowSectionWidth: (state, action)=>{
            console.log('firstRowSectioWidth  ', action.payload)
            state.firstRowSectionWidth = action.payload
        },
        setIsLoading:(state)=>{
            state.isLoading = !state.payload
        },
        setAccountComponentsMsg: (state, {payload})=>{
            state.accountComponentsMsg = {...state.accountComponentsMsg, payload}
        }
    },
    extraReducers:{
        [getProducts.pending]: (state)=>{
            state.isLoading = true
        },
        [getProducts.fulfilled]: (state, action)=>{
            state.products = action.payload?.data?.products
            if(action.payload){
                state.isLoading = false
            }
        },
        [getProducts.rejected]: (state)=>{
            state.isLoading = false
        }
    }
})

export const {
    setSubCategoryIndex,
    setOpenSubCategory,
    setWindowWidth,
    setFirstRowSectionWidth,
    setIsLoading,
    setAccountComponentsMsg
} = homeSlice.actions

export default homeSlice.reducer