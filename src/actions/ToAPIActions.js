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
    API.sendCategory(category)
  },

  deleteCard(id){
    API.deleteCard(id)
  },

  nextTest(){
    API.nextTest()
  },

  sendEdit(cardObj){
    API.sendEdit(cardObj)
  }
}
export default ToAPIActions