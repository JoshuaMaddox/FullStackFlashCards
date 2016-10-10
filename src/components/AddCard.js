import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CardStore  from '../stores/CardStore'
import {browserHistory} from "react-router";
import { Link } from "react-router"
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

export default class AddCard extends Component {
  constructor() {
    super();
    this.state = {
      cardAddSucceded: CardStore.getCardAdded()
    }

    this.postCard = this.postCard.bind(this)
    this._onChange = this._onChange.bind(this)
    this.addAnother = this.addAnother.bind(this)
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      cardAddSucceded: CardStore.getCardAdded() 
    })
  }

  postCard(e){
    e.preventDefault()
    const {category, question, answer } = this.refs
    let thisCat = category.value
    let cardObj = {
      category: thisCat.toUpperCase(),
      question: question.value,
      answer: answer.value
    }
    category.value = ''
    question.value = ''
    answer.value = ''
    ToAPIActions.submitCard(cardObj)
  }

  addAnother(e){
    e.preventDefault()
    ServerActions.addAnother()
  }

  render() {
    const { cardAddSucceded } = this.state
    let showAddMore;

    if(cardAddSucceded){
      showAddMore = (
        <ReactCSSTransitionGroup 
          transitionName="another" 
          transitionAppear={true} 
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}>
          <div className="row enterCard">
            <div className="formCard">
              <h3>Your Card Was Added to the Deck</h3>
              <Link to='/card/new' className="submitBtn" onClick={this.addAnother}>Add Another Card</Link>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    } else {
      showAddMore = (
        <ReactCSSTransitionGroup 
          transitionName="example" 
          transitionAppear={true} 
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}>
          <div className="row enterCard text-center">
            <div className="formCard">
              <h4>Add a Card to Your Study Deck</h4>
              <form onSubmit={this.postCard}>
                <div className="form-group">
                  <input type="text" className="form-control" ref='category' id="category" name='category' placeholder="Give Your Card a Category" required/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" ref='question' id="question" name='question' placeholder="Write a Question" required/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" ref='answer' id="answer" name='answer' placeholder="Write an Answer" required/>
                </div>
                <button type="submit" className="submitBtn">Submit</button>
              </form>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    }

    return (
      <div className='addContainer'>
        {showAddMore}
      </div>
    )
  }
}
