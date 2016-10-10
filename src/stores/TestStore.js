import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _next = ''

class TestStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'NEXT_RECEIVED':
          _next = action.payload.next
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

  getNext(){
    return _next
  }

}

export default new TestStore