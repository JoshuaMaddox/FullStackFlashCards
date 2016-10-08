import { get, post, put, delete } from 'axios'
import ServerActions from './actions/ServerActions'
import { browserHistory } from 'react-router'

const API = {
  getFlashCards(){
    get(`http://localhost:8000/test`)
      .then(res => {
        let { data } = res
        console.log('data: ', data)
        ServerActions.receiveFlashCards(data)
      })
      .catch(console.error)
  },

  submitCard(cardObj){
    post(`http://localhost:8000/cards`, cardObj)
      .then(res => {
        let { data } = res
        let success = data.success
        ServerActions.cardAdded(success)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getCategories(){
    get(`http://localhost:8000/categories`)
      .then(res => {
        let { data } = res
        ServerActions.receiveCats(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getCards(){
    get(`http://localhost:8000/cards`)
      .then(res => {
        let { data } = res
        ServerActions.receiveAllCards(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default API