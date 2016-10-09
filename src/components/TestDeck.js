import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import TestStore from '../stores/TestStore'
// import {browserHistory} from "react-router";
import { Link } from "react-router"
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

export default class TestDeck extends Component {

  constructor() {
    super();
    this.state = {
      testNext: TestStore.getNext(),
      question: true
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
    if(this.state.question){ 
      this.setState({
        question: false
      })
    } else {
      this.setState({
        question: true
      })
    }
  }

  render() {
    const { testNext, question } = this.state
    const { testEnd, res } = testNext
    console.log('testEnd: ', testEnd)
    console.log('res: ', res)
    let revealNext;
    let isQuestion = (
      <div className="testCardContainer">
        <div className="testCard">
          <h4>{res}</h4>
          <button className="takeTestBtn" onClick={this.nextAction}>Reveal Answer</button>
        </div>
      </div>
      )
    
    let isAnswer = (
      <ReactCSSTransitionGroup 
        transitionName="example" 
        transitionAppear={true} 
        transitionAppearTimeout={750}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
          <div className="testCardContainer">
            <div className="testCardAnswer">
              <h4>{res}</h4>
              <button className="takeTestBtn" onClick={this.nextAction}>See Next Question</button>
            </div>
          </div>
      </ReactCSSTransitionGroup> 
      )

    if(testNext && !testEnd) {
      revealNext = question ? isQuestion : isAnswer
    } else if(testEnd){
      revealNext = (
        <div className="testCardContainer">
          <div className="testCard">
            <h4 className='addCategoriesTest'>Add Categories to Take Another Test</h4>
            <Link to='/card/categories' className="takeTestBtn">Select Categories</Link>
          </div>
        </div>
      )
    } else {
      revealNext = (
        <div className="testCardContainer">
          <div className="testCard">
            <h4>Ready to Start The Test?</h4>
            <button className="takeTestBtn" onClick={this.nextAction}>Start Test</button>
          </div>
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
