import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CardStore  from '../stores/CardStore'
import { browserHistory } from "react-router";
import { Link } from "react-router"
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

export default class AllCards extends Component {

  constructor() {
    super();
    this.state = {
      allcards: CardStore.getAllCards()
    }
    this._onChange = this._onChange.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.editCard = this.editCard.bind(this)
  }

  componentDidMount(){
    ToAPIActions.getAllCards()
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      allcards: CardStore.getAllCards() 
    })
  }

  deleteCard(e){
    e.preventDefault()
    let id = e.target.id
    ToAPIActions.deleteCard(id)
  }

  editCard(e){
    e.preventDefault()
    let elmObj = document.getElementById(e.target.id)
    let id = elmObj.dataset.id
    let category = elmObj.dataset.cat
    let question = elmObj.dataset.ques
    let answer = elmObj.dataset.ans
    let editCardOBj = { id, category, question, answer }
    ServerActions.cardToEdit(editCardOBj)
    browserHistory.push(`/card/${id}/edit`)
  }

  // delete to here

  render() {
    const { allcards } = this.state
    let revealCards;

    if(allcards) {
       revealCards = allcards.map((card, index) => {
        let { id, category, answer, question } = card
        return (
          <div className="col-sm-12" key={id}>
            <div className="smallCardsOuter">
              <div className="smallCardsInner">
                <p className="category">{category}</p>
                <p className="question">{question}</p>
                <p className="answer">{answer}</p>
                <p className='delete' ref={category} id={id} onClick={this.deleteCard}>X</p>
                <p 
                  className='edit' 
                  data-id={id} 
                  data-cat={category} 
                  data-ans={answer} 
                  data-ques={question} 
                  id={index} 
                  onClick={this.editCard}>Edit</p>
              </div>
            </div>
          </div>
        )
      })
    } else {
      revealCards = <h3>No Categories Available to Show</h3>
    }
    return (
      <div className='allCardsContainer'>
       <ReactCSSTransitionGroup 
        transitionName="example" 
        transitionAppear={true} 
        transitionAppearTimeout={750}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {revealCards}
      </ReactCSSTransitionGroup>
      </div>
    )
  }
}
