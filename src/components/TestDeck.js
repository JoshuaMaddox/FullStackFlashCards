import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import TestStore from '../stores/TestStore'
// import {browserHistory} from "react-router";
import { Link } from "react-router"

export default class TestDeck extends Component {

  constructor() {
    super();
    this.state = {
      testNext: TestStore.getNext()
    }
    this._onChange = this._onChange.bind(this)
    this.nextAction = this.nextAction.bind(this)
  }

  componentWillMount() {
    ToAPIActions.nextTest()
    TestStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TestStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      testNext: TestStore.getNext()
    })
  }

  nextAction(e){
    e.preventDefault()
    ToAPIActions.nextTest()
  }

  render() {
    const { testNext } = this.state
    const { testEnd, res } = testNext
    console.log('testEnd: ', testEnd)
    console.log('res: ', res)
    let revealNext;

    if(testNext && !testEnd) {
      revealNext = (
        <div>
          <h3>{res}</h3>
          <button className="btn btn-primary" onClick={this.nextAction}>Next</button>
        </div>
      )
    } else if(testEnd){
      revealNext = (
        <div>
          <h3>Add Categories to Take Another Test</h3>
          <Link to='/card/categories' className="btn btn-danger">Select Categories</Link>
        </div>
      )
    } else {
      revealNext = (
        <div>
          <h3>Ready to Start The Test?</h3>
          <button className="btn btn-primary" onClick={this.nextAction}>Start Test</button>
        </div>
      )
    }

    return (
      <div>
        {revealNext}
      </div>   
    )
  }
}
