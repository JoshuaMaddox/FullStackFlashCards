import React, { Component } from 'react'
import CardStore from '../stores/CardStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className="mainContaienr">
        <div className="row">
          <Link to='/card' className="btn btn-primary">See All Cards</Link> 
          <Link to='/card/new' className="btn btn-danger">Add Cards</Link>
          <Link to='/card/categories' className="btn btn-danger">Create A Test</Link>
        </div>
        {this.props.children}
      </div>

    )
  }
}
  