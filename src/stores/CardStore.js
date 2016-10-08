import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _allCards = []
let _cardAdded = false

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
          console.log('success: ', _cardAdded)
          this.emit('CHANGE')
          break;
        case 'ADD_ANOTHER':
          _cardAdded = false
          console.log('success: ', _cardAdded)
          this.emit('CHANGE')
          break;
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.on('CHANGE', cb)
  }

  getAllCards(){
    return _allCards
  }

  getCardAdded(){
    return _cardAdded
  }
}

export default new CardStore