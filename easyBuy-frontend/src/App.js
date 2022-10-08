import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/header/Header.js'
import Home from './components/homepage/Home'
import Signup from './components/account/Signup'
import Login from './components/account/Login'
import Footer from './components/homepage/Footer'
import AccountFooter from './components/account/Footer'
import Product from './components/product/Product'
import VerifyEmail from './components/account/VerifyEmail'
import ResetPassword from './components/account/ResetPassword'
import ForgotPassword from './components/account/ForgotPassword'
import Search from './components/search/Search'

import SharedLayoutHome from './shared_layout/SharedLayoutHome'
import SharedLayoutAccount from './shared_layout/SharedLayoutAccount'

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayoutHome/>}>
          <Route index element={<Home/>}></Route>
          <Route path='product/:name' element={<Product/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
        </Route>
        <Route path='/account' element={<SharedLayoutAccount/>}>
          <Route path='user/verify-email' element={<VerifyEmail/>}></Route>
          <Route path='signup' element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='user/reset-password' element={<ResetPassword/>}></Route>
          <Route path='forgot-password' element={<ForgotPassword/>}></Route>
        </Route>
      </Routes>
  </BrowserRouter>
}

export default App