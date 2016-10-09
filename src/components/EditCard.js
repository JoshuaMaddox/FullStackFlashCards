import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CardStore  from '../stores/CardStore'
import { browserHistory } from "react-router";
import { Link } from "react-router"
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

export default class AddCard extends Component {
  constructor() {
    super();
    this.state = {
      cardToEdit: CardStore.getCardToEdit(),
      cardEditSucceeded: CardStore.editConfirmation()
    }

    this._onChange = this._onChange.bind(this)
    this.sendEdit = this.sendEdit.bind(this)
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      cardToEdit: CardStore.getCardToEdit(),
      cardEditSucceeded: CardStore.editConfirmation() 
    })
  }

  sendEdit(e){
    e.preventDefault()
    const {category, question, answer, id } = this.refs
    let cardObj = {
      id: id.value,
      category: category.value,
      question: question.value,
      answer: answer.value
    }
    ToAPIActions.sendEdit(cardObj)
  }

  render() {

    const { cardToEdit } = this.state
    console.log( cardToEdit)
    const { id, category, question, answer } = cardToEdit

    return (

     <ReactCSSTransitionGroup 
        transitionName="example" 
        transitionAppear={true} 
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={500}>
        <div className="row enterCard" key={id}>
          <div className="formCard">
          <h4>Edit Your Card Then Submit</h4>
            <form onSubmit={this.sendEdit}>
              <div className="form-group">
                <input type="text" className="form-control" ref='category' id="category" name='category' defaultValue={category} required/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" ref='question' id="question" name='question' defaultValue={question} required/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" ref='answer' id="answer" name='answer' defaultValue={answer} required/>
              </div>
               <div className="form-group">
                <input type="text" className="form-control" ref='id' id="id" name='id' value={id} readOnly/>
              </div>
              <button type="submit" className="submitBtn">Submit Edit</button>
            </form>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
