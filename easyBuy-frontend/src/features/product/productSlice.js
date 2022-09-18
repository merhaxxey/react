import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    addItemsToCart: 0,
    product: {},
    reviewsPerRatingLevel: {},
    reviewUserName: [],
    isLoading: true,
    similarProduct: [],
    writeReview: true
}

export const getProduct = createAsyncThunk('product/getproduct', async(name)=>{
    try {
        console.log(name)
        const product = await axios.get('/api/v1/product/'+name)
        return product
    } catch (error) {
        
    }
})

export const getSimilarProduct = createAsyncThunk('products/getSimilarProduct', async(categoryName)=>{
    try {
        const similarProduct = await axios.get('/api/v1/product/similar/'+categoryName)
        return similarProduct
    } catch (error) {
        
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setAddItemsToCart: (state, action)=>{
            state.addItemsToCart = action.payload
        },
        setIsLoading:(state, {payload})=>{
            state.isLoading = payload
        },
        setWriteReview: (state, action)=>{
            state.writeReview = action.payload
        }
    },
    extraReducers:{
        [getProduct.pending]:(state, action)=>{
            state.isLoading = true
        },
        [getProduct.fulfilled]:(state, action)=>{
            state.isLoading = false
            if(action.payload){
                state.reviewUserName = action.payload?.data?.reviewUserName
                state.reviewsPerRatingLevel = action.payload?.data?.reviewsPerRatingLevel
                state.product = action.payload?.data.product
            }
        },
        [getProduct.rejected]:(state)=>{
            state.isLoading = false
        },

        [getSimilarProduct.pending]:(state)=>{
            state.isLoading = true
        },
        [getSimilarProduct.fulfilled]:(state, action)=>{
            console.log('similar product', action)
            if(action.payload){
                state.similarProduct = action.payload?.data?.product
            }
        },
        [getSimilarProduct.rejected]:(state)=>{
        }
    }
})

export const {setAddItemsToCart, setIsLoading, setWriteReview} = productSlice.actions
export default productSlice.reducer