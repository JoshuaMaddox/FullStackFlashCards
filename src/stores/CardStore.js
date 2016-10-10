import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _allCards = []
let _cardAdded = false
let _editConfirmation = false
let _cardToEdit = {}

class CardStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'CARDS_RECEIVED':
          _allCards = action.payload.flashcards
          this.emit('CHANGE')
          break;
        case 'CARD_ADDED':
          _cardAdded = action.payload.success
          this.emit('CHANGE')
          break;
        case 'ADD_ANOTHER':
          _cardAdded = false
          this.emit('CHANGE')
          break;
        case 'CARD_TO_EDIT':
          _cardToEdit = action.payload.editCardOBj
          this.emit('CHANGE')
          break;
        case 'CARD_EDITED':
          _editConfirmation = action.payload.success
          this.emit('CHANGE')
          break;
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getAllCards(){
    return _allCards
  }

  getCardAdded(){
    return _cardAdded
  }

  getCardToEdit(){
    return _cardToEdit
  }

  editConfirmation(){
    return _editConfirmation
  }
}

export default new CardStore