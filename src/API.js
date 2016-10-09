import axios from 'axios'
import { get, post, put, } from 'axios'
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

  sendEdit(cardObj){
    put(`http://localhost:8000/cards/${cardObj.id}`, cardObj)
      .then(res => {
        let { data } = res
        let success = data.success
        ServerActions.cardEdited(success)
        browserHistory.push('/card')
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
  },

  sendCategory(category) {
    get(`http://localhost:8000/test`, {
      params: { category }
    })
      .then(res => {
        let { data } = res
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteCard(id){
    axios.delete(`http://localhost:8000/cards/${id}`)
      .then(res => {
        this.getCards()
        console.log('delete successful', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  nextTest(){
    get(`http://localhost:8000/test`)
      .then(res => {
        let { data } = res
        console.log('I am test data', data)
        ServerActions.receiveNext(data)
      })
      .catch(console.error)
  }

}

export default API