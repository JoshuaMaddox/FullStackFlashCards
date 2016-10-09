import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveAllCards(flashcards){
    AppDispatcher.dispatch({
      type: 'CARDS_RECEIVED',
      payload: { flashcards }
    }) 
  },

  cardAdded(success){
    AppDispatcher.dispatch({
      type: 'CARD_ADDED',
      payload: { success }
    }) 
  },

  addAnother(){
    AppDispatcher.dispatch({
      type: 'ADD_ANOTHER'
    })
  },

  receiveCats(categories){
    AppDispatcher.dispatch({
      type: 'CATS_RECEIVED',
      payload: { categories }
    })
  },

  receiveNext(next){
    AppDispatcher.dispatch({
      type: 'NEXT_RECEIVED',
      payload: { next }
    })
  },

  cardToEdit(editCardOBj){
    AppDispatcher.dispatch({
      type: 'CARD_TO_EDIT',
      payload: { editCardOBj }
    })
  },

  cardEdited(success){
    AppDispatcher.dispatch({
      type: 'CARD_EDITED',
      payload: { success }
    })
  }

}
export default ServerActions


