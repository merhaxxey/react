import {configureStore} from '@reduxjs/toolkit'
import headerReducer from './features/header/headerSlice'
import homeReducer  from './features/home/homeSlice'
import productReducer from './features/product/productSlice'
import searchReducer from './features/search/searchSlice'

export const store = configureStore({
    reducer: {
      header: headerReducer,
      home: homeReducer,
      product: productReducer,
      search: searchReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
