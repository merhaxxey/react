import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    isLoading: true,
    formValue: {min:0, max:0},
    defaultFilterValues:{
        formValue: {min:0, max:0},
        discountValues: 'no'
    }
}

export const searchProducts = createAsyncThunk('search/getProducts', async(string, thunkAPI)=>{
    try{
        const products = await axios.get('/api/v1/search')
        return products
    }
    catch(error){
        return thunkAPI
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setIsLoading: (state, action)=>{
            state.isLoading = action.payload
        },
        setFormValue: (state, action)=>{
            state.formValue = action.payload
        },
        setProducts: (state, action)=>{
            state.products = action.payload
        },
        setDefaultFilterValues: (state, action)=>{
            state.defaultFilterValues = action.payload
        }
    },
    extraReducers:{
        [searchProducts.pending]:(state, action)=>{
            state.isLoading = true
        },
        [searchProducts.fulfilled]:(state, {payload})=>{    
            state.isLoading = false
            if(payload?.data){
                if('products' in payload.data){
                    state.products = payload.data?.products
                }
            }
        },
        [searchProducts.rejected]:(state, action)=>{
            state.isLoading = false
            console.log(action.payload)
        }
    }
})

export const {
    setIsLoading,
    setFormValue,
    setProducts,
    setDefaultFilterValues
} = searchSlice.actions

export default searchSlice.reducer