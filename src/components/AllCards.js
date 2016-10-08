import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CardStore  from '../stores/CardStore'
import {browserHistory} from "react-router";
import { Link } from "react-router"

export default class AllCards extends Component {

  constructor() {
    super();
    this.state = {
      allcards: CardStore.getAllCards()
    }
    this._onChange = this._onChange.bind(this)
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

  render() {
    const { allcards } = this.state
    let revealCards;

    if(allcards) {
       revealCards = allcards.map((card, index) => {
        let { id, category, answer, question } = card
        return (
          <div className="col-md-3" key={id}>
            <ul>
              <li>{category}</li>
              <li>{answer}</li>
              <li>{question}</li>
            </ul>
            <button className='btn btn-success' ref={category} id={id}>Delete This Card</button>
          </div>
        )
      })
    } else {
      revealCards = <h3>No Categories Available to Show</h3>
    }
    return (
      <div>
        {revealCards}
      </div>
    )
  }
}
