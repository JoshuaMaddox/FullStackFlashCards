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
    API.getCards()
  },

  selectCategory(category){
    console.log('I am category in ToAPIActions', category)
    API.sendCategory(category)
  }
}
export default ToAPIActions