import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import AddCard from './components/AddCard'
import AllCards from './components/AllCards'
import TestDeck from './components/TestDeck'
import Categories from './components/Categories'
import EditCard from './components/EditCard'


//browserHistory.push("/")

render(
  <div className="container mainContainer text-center">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}>
        <Route path = '/card' component = {AllCards} />
        <Route path = '/card/new' component = {AddCard} />
        <Route path = '/card/categories' component = {Categories} />
        <Route path = '/test' component = {TestDeck} />
        <Route path = '/card/:id/edit' component = {EditCard} />
      </Route>
    </Router>
  </div>,
  document.getElementById('root')  
)