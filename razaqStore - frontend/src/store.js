import {configureStore} from '@reduxjs/toolkit'
import headerReducer from './features/header/headerSlice'
import homeReducer  from './features/home/homeSlice'
import productReducer from './features/product/productSlice'
import searchReducer from './features/search/searchSlice'
import profileReducer from './features/user-profile/profileSlice'
import cartReducer from './features/cart/cartSlice'
import categoryReducer from './features/category/categorySlice'

export const store = configureStore({
    reducer: {
      header: headerReducer,
      home: homeReducer,
      product: productReducer,
      search: searchReducer,
      profile: profileReducer,
      cart: cartReducer,
      category: categoryReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
