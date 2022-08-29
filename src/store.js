import {configureStore} from '@reduxjs/toolkit'
import headerReducer from './features/header/headerSlice'
import homeReducer  from './features/home/homeSlice'
import productReducer from './features/product/productSlice'

export const store = configureStore({
    reducer: {
        header: headerReducer,
        home: homeReducer,
        product: productReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
