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
  }

}
export default ServerActions


