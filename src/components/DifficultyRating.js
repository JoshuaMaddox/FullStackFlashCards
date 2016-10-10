// import React, { Component } from 'react'
// import TestDeck from './TestDeck'
// import ToAPIActions from '../actions/ToAPIActions'

// export default class DifficultyRating extends Component {
//   constructor() {
//     super();
//     this.setDifficulty = this.setDifficulty.bind(this)
//   }

//   setDifficulty(e){
//     e.preventDefault()
//     let cardDiff = e.target.id
//     let elmObj = document.getElementById(e.target.id)
//     let cardID = elmObj.dataset.id
//     let cardDifficulty = {
//       id: cardID,
//       difficulty: cardDiff
//     }
//     ToAPIActions.sendDiff(cardDifficulty)
//   }

//   render() {

//     const { id } = this.props
    
//     return (
//       <div className="ratingBtnsContainer">
//         <p className='ratingTag'>Add a difficulty ranking to add this card to your review deck</p>
//         <button className="ratingBtns" ref='difficulty' id='hard' data-id={id} onClick={this.setDifficulty}>Hard</button>
//         <button className="ratingBtns" id='medium' data-id={id} onClick={this.setDifficulty}>Medium</button>
//         <button className="ratingBtns" id='easy' data-id={id} onClick={this.setDifficulty}>Easy</button>
//       </div>
//     )
//   }
// }
