import API from '../API'

const ToAPIActions = {
  getFlashCards(){
    API.getFlashCards() 
  },

  submitCard(cardObj){
    API.submitCard(cardObj)
  },

  getCats(){
    API.getCategories()
  },

  getAllCards(){
    console.log('cards request sent')
    API.getCards()
  }
}
export default ToAPIActions