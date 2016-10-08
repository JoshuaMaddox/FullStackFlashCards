import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import AddCard from './components/AddCard'
import AllCards from './components/AllCards'
import Categories from './components/Categories'


//browserHistory.push("/")

render(
  <div className="container text-center">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}>
        <Route path = '/card' component = {AllCards} />
        <Route path = '/card/new' component = {AddCard} />
        <Route path = '/card/categories' component = {Categories} />
      </Route>
    </Router>
  </div>,
  document.getElementById('root')  
)