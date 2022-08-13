import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Header from './header/Header.js'
import Home from './homepage/Home'
import Signup from './account/Signup'
import Login from './account/Login'
import Footer from './homepage/Footer'
import AccountFooter from './account/Footer'
import Product from './product/Product'

function App() {
  return <Router>
      <Switch>
        <Route exact path='/'>
            <Header/>
            <Home/>
            <Footer/>
        </Route>
        <Route  path='/signup'>
          <Signup/>
          <AccountFooter/>
        </Route>
        <Route path='/login'>
          <Login/>
          <AccountFooter/>
        </Route>
        <Route path='/product/:id' children={
          <>
          <Header/>
          <Product/>
          </>
        }>
        </Route>
      </Switch>
  </Router>
}

export default App