import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _allCategories = []

class CategoriesStore extends EventEmitter {
  constructor(){
    super()
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'CATS_RECEIVED':
          _allCategories = action.payload.categories
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

  getCategories(){
    return _allCategories
  }

}

export default new CategoriesStore