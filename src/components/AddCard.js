import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CardStore  from '../stores/CardStore'
import {browserHistory} from "react-router";
import { Link } from "react-router"

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
    console.log('postCard Called: ')
    e.preventDefault()
    const {category, question, answer } = this.refs
    let cardObj = {
      category: category.value,
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
    console.log( cardAddSucceded )
    let showAddMore;


    if(cardAddSucceded){
      showAddMore = (
        <div className="row">
          <h3>Your Card Was Successfully Added to the Study Deck<br /></h3>
          <Link to='/card/new' className="btn btn-danger" onClick={this.addAnother}>Add Another Card</Link>
        </div>
      )
    } else {
      showAddMore = (
        <div className="row enterCard">
          <form onSubmit={this.postCard}>
            <div className="form-group">
              <label>Category</label>
              <input type="text" className="form-control" ref='category' id="category" name='category' placeholder="Give Your Card a Category" required/>
            </div>
            <div className="form-group">
              <label>Question</label>
              <input type="text" className="form-control" ref='question' id="question" name='question' placeholder="Give Your Card a Question" required/>
            </div>
            <div className="form-group">
              <label>Answer</label>
              <input type="text" className="form-control" ref='answer' id="answer" name='answer' placeholder="Give Your Card an Answer" required/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
            {/*<button onClick={this.testReroute}>test</button>*/}
          </form>
      </div>
      )
    }

    return (
      <div>
        {showAddMore}
      </div>
    )
  }
}
